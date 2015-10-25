/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import {Users, FutureRides} from 'collections';
import BlazeTemplate from './BlazeTemplate';

@reactMixin.decorate(ReactMeteorData)
export default class Calendar extends Component {
  getMeteorData() {
    return {
      users : Users.find().fetch()
    };
  }

  componentDidMount() {

    scheduler.init('scheduler_here', new Date());
    scheduler.meteor(FutureRides.find({}), FutureRides);
    scheduler.locale.labels.section_time = 'Date and Time';

    scheduler.attachEvent('onBeforeLightbox', function () {
      if (!Meteor.user().profile) {
        Meteor.call('getAuthorizeUrl', function(err, res) {
          window.location = res;
        });
      }
      $('.dhx_section_time select:gt(3)').hide();
      $('.dhx_section_time span').remove();
      return true;
    });

    var geocoder = new google.maps.Geocoder();
    scheduler.attachEvent('onEventSave', function (id, e) {
      scheduler.getEvent(id).userId = Meteor.userId();
      scheduler.updateEvent(id);
      let details = FutureRides.findOne({ 'id' : id });
      geocoder.geocode({'address' :scheduler.getEvent(id).startAddress}, function (results, status) {
        FutureRides.update(details._id, {$set : { start_lat : results[0].geometry.location.lat() } });
        FutureRides.update(details._id, {$set : { start_lng : results[0].geometry.location.lng() } });
        if (details.start_lat && details.start_lng && details.end_lat && details.end_lng) {
          Meteor.call('scheduleRide', details, function (err, res) {
           if (err) { throw new err; }
          });
        }
      });
      geocoder.geocode({'address' : scheduler.getEvent(id).endAddress}, function (results, status) {
        FutureRides.update(details._id, {$set : { end_lat : results[0].geometry.location.lat() } });
        FutureRides.update(details._id, {$set : { end_lng : results[0].geometry.location.lng() } });
        if (details.start_lat && details.start_lng && details.end_lat && details.end_lng) {
          Meteor.call('scheduleRide', details, function (err, res) {
           if (err) { throw new err; }
          });
        }
      });
      return true;
    });


    scheduler.locale.labels.section_start = 'Start Address';
    scheduler.locale.labels.section_end = 'End Address';

    scheduler.config.lightbox.sections = [
      { name : 'start', height : 50, map_to : 'startAddress', type : 'textarea', focus : true },
      { name : 'end', height : 50, map_to : 'endAddress', type : 'textarea', focus : true },
      { name : 'time', height : 72, type : 'time', map_to : 'auto' }
    ];

    $('#login-buttons').on('click', '#login-buttons-logout', function() {
      FlowRouter.go('/login');
    });
  }

  render() {
    let _Template = typeof (Template) === 'function' ? Template : {
      loginButtons : 'any'
    };

    let schedulerStyles = {
      width : '100%',
      height : '700px'
    };

    return (
      <div className="Calendar">
        <BlazeTemplate template={_Template.loginButtons} />
        <div id="scheduler_here" className="dhx_cal_container" style={schedulerStyles}>
            <div className="dhx_cal_navline">
            <div className="dhx_cal_prev_button">&nbsp;</div>
            <div className="dhx_cal_next_button">&nbsp;</div>
            <div className="dhx_cal_today_button"></div>
            <div className="dhx_cal_date"></div>
            <div className="dhx_cal_tab" name="day_tab" style={{right:'332px'}}></div>
            <div className="dhx_cal_tab" name="week_tab" style={{right:'268px'}}></div>
            <div className="dhx_cal_tab" name="month_tab" style={{right:'204px'}}></div>
            <div className="dhx_cal_tab" name="year_tab" style={{right:'140px'}}></div>
            </div>
            <div className="dhx_cal_header">
            </div>
            <div className="dhx_cal_data">
            </div>
        </div>
      </div>
    );
  }
}
