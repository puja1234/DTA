

import React, { Component } from 'react'
import { Row, Col } from 'react-bootstrap'
import LogDropdown from '../../Core/Dropdown/index'
import ActivityLogCollaborator from '../ActivityLogCollaborator'
import MultiSelectDropdown from '../../Core/MultiSelectDropDown'
import TtnButton from 'core/Button/btn';
import DeleteModal from '../../Core/DeleteModal'
import { deleteActivity } from '../../actions/activity.actions'
import { connect } from 'react-redux';
import ModalComp from '../../Core/ModalComp'
import _ from 'lodash'


class ActivityLogComp extends Component{
    constructor(props){
        super(props);
        const logActivity = Object.assign({}, this.props.activity);
        this.state = {
            editBtn: false,
            activity: logActivity,
            newDesc: logActivity.description,
            displayModal: false,
            deleteComp: false
        }
    }

    onEditClick = () => {
        this.setState({
            editBtn: true
        })
    }

    onOkClick = () => {
        this.setState({
            editBtn: false,
        });
        console.log('this.state.activity--------->>>>',this.state.activity);
        this.props.edittedLog(this.state.activity);

    };

    onEditDeleteClick = () => {
        let activityLog = Object.assign({}, this.props.activity);
        this.setState({
            editBtn: false,
            activity: activityLog
        });
    }

    onDeleteClick = (activity) => {
        this.setState({
            displayModal: true
        })
    }


    setSelectedValue = (item, property) => {
        this.state.activity[property] = item;
        this.setState({
            activity: this.state.activity
        })
    }

    onDescChange = (event) => {
        this.setState({
            newDesc: event.target.value
        },() => {
            this.state.activity.description = this.state.newDesc;
            this.setState({
                activity: this.state.activity
            })
        });
    }

    onCollabChange = (collaborators) => {
        this.setState({
            activity: {
                collaborators: collaborators
            }
        })
    }

    onSelectedVal = (newCollab) => {
        (this.state.activity.collaborators.length && this.state.activity.collaborators.indexOf(newCollab) > -1) ? null : this.state.activity.collaborators.push(newCollab);
        this.setState({activity: this.state.activity});
    };

    onDeleteCollab = (deletedVal) => {
        this.state.activity.collaborators.splice(this.state.activity.collaborators.indexOf(deletedVal), 1);
        this.setState({
            activity: this.state.activity
        })
    };

    onCloseModalClick = () => {
        this.setState({
            displayModal: false
        })
    }

    deleteEntry = () => {
        this.props.deleteActivity(this.state.activity._id);
        this.setState({
            displayModal: false,
        })
    };

    render(){
        const activityLog = this.props.activity;
        let activityTitles = ['Westcon','Knowlegde Meet','Daily Time Analysis'];
        let durationTimeHH = [1,2,3,4,5,6,7,8];
        let durationTimeMM = [0,10,20,30,40,50];
        return(
            <div>
                {this.state.editBtn === true?
                    <div className="data-div">
                        <Row>
                            <Col md={2} lg={2} className="log-col">
                                <LogDropdown className='type'
                                             data={activityTitles}
                                             title={this.state.activity.activityType}
                                             onSelect={(item) => this.setSelectedValue(item, 'activityType')}/>
                            </Col>
                            <Col md={3} lg={3} className="log-col">
                                <LogDropdown className="duration"
                                             title={this.state.activity.hh}
                                             data={durationTimeHH}
                                             onSelect={(item) => {this.setSelectedValue(item, 'hh')}}/>:
                                <LogDropdown className="duration"
                                             title={this.state.activity.mm}
                                             data={durationTimeMM}
                                             onSelect={(item) => {this.setSelectedValue(item, 'mm')}}/>
                            </Col>
                            <Col md={3} lg={3} className="log-col">
                                <input type="text"
                                       value={this.state.activity.description}
                                       onChange={(value) => {this.onDescChange(value)}}/>
                            </Col>
                            <Col md={1} lg={1} className="log-col">
                                <span>{this.state.activity.status}</span>
                            </Col>
                            <Col md={2} lg={2} lgOffset={1} className="log-col">
                                <TtnButton iconButton
                                           level = "primary"
                                           rounded icon = "glyphicon glyphicon-ok"
                                           onClick = {() => this.onOkClick()}/>

                                <TtnButton iconButton
                                           level = "primary"
                                           rounded icon = "glyphicon glyphicon-remove"
                                           onClick = {() => this.onEditDeleteClick()}/>

                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} lg={12} className="log-col">
                                {(activityLog.collaborators && activityLog.collaborators.length > 0) ? <ActivityLogCollaborator collaborators={activityLog.collaborators}/> : null }
                            </Col>
                        </Row>

                    </div>:
                    <div className="data-div">
                        <Row>
                            <Col md={2} lg={2} className="log-col">
                                <span>{activityLog.activityType}</span>
                            </Col>
                            <Col md={3} lg={3} className="log-col">
                                <span>{activityLog.hh}</span>:
                                <span>{activityLog.mm}</span>
                            </Col>
                            <Col md={3} lg={3} className="log-col">
                                <span>{activityLog.description}</span>
                            </Col>
                            <Col md={1} lg={1} className="log-col">
                                <span>{activityLog.status}</span>
                            </Col>
                            <Col md={2} lg={2} lgOffset = {1} className="log-col">

                                {this.props.month === new Date().getMonth()?
                                    <div>
                                        <TtnButton iconButton
                                                   level = "primary"
                                                   rounded icon = "glyphicon glyphicon-pencil"
                                                   onClick = {() => this.onEditClick()}/>

                                        <TtnButton iconButton
                                                   level = "primary"
                                                   rounded icon = "glyphicon glyphicon-trash"
                                                   onClick = {() => this.onDeleteClick(activityLog)}/>
                                    </div>: null
                                }

                            </Col>
                        </Row>
                        <Row>
                            <Col md={12} lg={12} className="log-col">
                                {(activityLog.collaborators && activityLog.collaborators.length > 0) ? <ActivityLogCollaborator collaborators={activityLog.collaborators}/> : null }
                            </Col>
                        </Row>

                    </div>
                }

                <ModalComp modalClassName = 'inmodal'
                           modalShow = {this.state.displayModal}
                           modalHide = {() => {this.onCloseModalClick()}}
                           modalHeaderMsg = "Activity Deleted successfully"
                           modalBody = {<DeleteModal deleteActivity={this.deleteEntry} close={this.onCloseModalClick}/>}
                           modalFooterClose = {() => {this.onCloseModalClick()}}
                           modalFooterText = 'Close'
                />

            </div>
        )
    }
}

//export default ActivityLogComp;

const mapDispatchToProps = (dispatch) => ({
    deleteActivity : (activityId) => {dispatch(deleteActivity(activityId))},

});

export default connect(null, mapDispatchToProps)(ActivityLogComp);

