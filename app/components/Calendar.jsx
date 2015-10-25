/* global ReactMeteorData */
import React, {Component} from 'react';
import reactMixin from 'react-mixin';
import {Users, Posts, FutureRides, Tasks} from 'collections';

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
    scheduler.meteor(Tasks.find({}), Tasks);
 }

  render() {
    let schedulerStyles = {
      width: '100%',
      height: '500px'
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
