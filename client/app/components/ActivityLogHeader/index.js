/**
 * Created by saubhagya on 20/7/17.
 */
import React, { Component } from 'react'
import { Row, Col} from 'react-bootstrap'
//import { TSMS_TextButton } from './../../Core/Button'
import TtnButton from 'core/Button/btn';
import {monthArray} from '../../../constants/Index'
import {getDate} from '../../../utils/common'
import moment from 'moment'


class ActivityLogHeader extends Component{
    render(){
        let activityArray = this.props.activities;
        let totalTime = 0,totalHours = 0,totalMins = 0;
        activityArray.map(function(activity){
            totalHours=totalHours+activity.hh;
            totalMins=totalMins+activity.mm;
            while(totalMins > 60){
                totalHours=totalHours+1;
                totalMins = totalMins-60
            }
        })
        /*activityArray.map((activity) => {
            if(activity.duration == '30 mins'){
                totalTime = totalTime + 0.5;
            }
            else{
                let duration = activity.duration.split(' ');
                let timeLog = parseInt(duration[0]);
                totalTime = totalTime + timeLog;
            }
        })*/

        //let month = '';
        let date = new Date(this.props.logDate);
        let formattedDate = getDate(date);
        let logDay = moment(formattedDate).format('ddd');
        /*let str = formattedDate.split('/');

        monthArray.forEach((item) => {
            (item.num === str[0])?month = item.month:null
        });

        let newDate = month + ' ' + str[1] + ',' + str[2];
        let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let logDate = new Date(newDate);
        let logDay = days[logDate.getDay()];*/

        return(
            <Row className = "show-grid">
                <Col md = {2} lg = {2} className = "log-col">
                    <span className = "log-date-day">{formattedDate}</span>
                    <span className = "log-date-day">{logDay}</span>
                </Col>
                <Col md = {1} lg = {1} lgOffset = {1} className = "log-col">
                    <span>{totalHours}Hrs {totalMins}Mins</span>
                </Col>
                <Col md = {4} lg = {4} lgOffset = {4} className = "log-col">
                    <TtnButton bClassName = "log-clear-button"
                               level = "primary"
                               title = "Log Time"
                               onClick = {this.props.onLogTimeClick}/>

                    <TtnButton bClassName = "log-clear-button"
                               level = "primary"
                               title = "Clear"
                               onClick = {this.props.onClearClick}/>
                    {/*<TSMS_TextButton bClassName="log-clear-button"
                                     onClickFunc={this.props.onLogTimeClick}
                                     dispName="Log Time"/>

                    <TSMS_TextButton bClassName="log-clear-button"
                                     onClickFunc={this.props.onClearClick}
                                     dispName="Clear"/>*/}


                </Col>
            </Row>
        );
    }
}

export default ActivityLogHeader