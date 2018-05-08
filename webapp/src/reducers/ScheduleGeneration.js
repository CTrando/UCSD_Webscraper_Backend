import {PLAN_SCHEDULE, RECEIVE_SCHEDULE, REQUEST_SCHEDULE, SET_UID} from '../actions/scheduleActions';

/**
 Should be able to access this through state.ScheduleGeneration
 **/

export default function ScheduleGeneration(state = {scheduleScreen:false, generating: false, uid: 0,
                                                    schedule: []}, action) {
    switch (action.type) {
        case REQUEST_SCHEDULE:
            return Object.assign({}, state, {
                generating: action.generating
            });
        case RECEIVE_SCHEDULE:
            return Object.assign({}, state, {
                generating: action.generating,
                schedule: action.schedule,
                scheduleScreen: action.scheduleScreen
            });
        case PLAN_SCHEDULE:
            return Object.assign({}, state, {
                scheduleScreen: action.scheduleScreen,
            });
        case SET_UID:
            return Object.assign({}, state, {
                uid: action.uid,
            });
        default:
            return state;
    }
}