import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {generateSchedule} from "./schedulegeneration/ScheduleGenerator";
import "./css/Landing.css";
import {LeftSidePanel} from './landing/LeftSidePanel';
import {RightSidePanel} from './landing/RightSidePanel';
import MainPanel from './landing/MainPanel';

class Landing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: [],
            calendarError: false,
            enableCalendar: false
        }
    }

    handleSubmit() {
        let newState = {};
        newState.schedule = [];
        newState.calendarError = false;
        newState.enableCalendar = false;

        generateSchedule(this.props.selectedClasses)
            .then(schedule => {
                console.log(schedule);
                if (schedule.length > 0) {
                    newState.schedule = schedule;
                    newState.enableCalendar = true;
                } else {
                    newState.calendarError = true;
                }
                this.setState(newState);
            })
            .catch(error => {
                newState.calendarError = true;
                this.setState(newState);
            });
    }

    clearSchedule() {
        this.setState({enableCalendar: false});
    }

    render() {
        // have to remove padding from grid
        return (
            <React.Fragment>
                <div className="container">
                    <LeftSidePanel />
                    <MainPanel />
                    <RightSidePanel />
                </div>
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        generateSchedule: generateSchedule
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        selectedClasses: state.ClassSelection,
        scheduleInfo: state.ScheduleGeneration
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
