/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import {Users, Posts, FutureRides} from 'collections';


@reactMixin.decorate(ReactMeteorData)
export default class Calendar extends Component {
  getMeteorData() {
    return {
      users : Users.find().fetch(),
      posts : Posts.find().fetch()
    };
  }

  componentDidMount() {
    scheduler.init('scheduler_here', new Date());
    scheduler.meteor(FutureRides.find({}), FutureRides);
    scheduler.locale.labels.section_time = 'Date and Time';

    scheduler.attachEvent('onBeforeLightbox', function () {
      $('.dhx_section_time select:gt(3)').hide();
      $('.dhx_section_time span').remove();
      return true;
    });

    scheduler.attachEvent('onEventSave', function (id, e) {
      scheduler.getEvent(id).userId = Meteor.userId();
      scheduler.updateEvent(id);
      let details = scheduler.getEvent(id);
      console.log(details, 'details');
      Meteor.call('scheduleRide', details, function (err, res) {
       if (err) { throw new err; }
        console.log(res);
      });
      return true;
    });

    scheduler.config.lightbox.sections = [
      { name : 'text', height : 50, map_to : 'text', type : 'textarea', focus : true },
      { name : 'time', height : 72, type : 'time', map_to : 'auto' }
    ];
  }

  render() {
    let schedulerStyles = {
      width : '100%',
      height : '500px'
    };
    return (
      <div className="Calendar">
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
