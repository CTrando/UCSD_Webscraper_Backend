import {
    INCREMENT_PROGRESS,
    RECEIVE_SCHEDULE, REQUEST_SCHEDULE, SET_CALENDAR_MODE, SET_PROGRESS, SET_TOTAL_POSSIBLE_NUM_SCHEDULE,
    SET_UID
} from '../actions/ScheduleGenerationActions';

/**
 Should be able to access this through state.ScheduleGeneration
 **/

export default function ScheduleGeneration(state = {
    calendarMode: false,
    generating: false,
    generatingProgress: 0,
    totalNumPossibleSchedule: 0,
    uid: 0,
    generateSuccess: true,
    schedule: {"classes": [], "errors": []}
}, action) {
    switch (action.type) {
        case REQUEST_SCHEDULE:
            return Object.assign({}, state, {
                generating: action.generating
            });
        case RECEIVE_SCHEDULE:
            let generateSuccess = action.schedule.classes !== null;
            return Object.assign({}, state, {
                generating: action.generating,
                schedule: action.schedule,
                generateSuccess: generateSuccess,
            });
        case SET_CALENDAR_MODE:
            return Object.assign({}, state, {
                calendarMode: action.calendarMode
            });
        case SET_UID:
            return Object.assign({}, state, {
                uid: action.uid,
            });
        case SET_PROGRESS:
            return Object.assign({}, state, {
                generatingProgress: action.generatingProgress
            });
        case INCREMENT_PROGRESS:
            return Object.assign({}, state, {
                generatingProgress: state.generatingProgress + action.by
            });
        case SET_TOTAL_POSSIBLE_NUM_SCHEDULE:
            return Object.assign({}, state, {
                totalNumPossibleSchedule: action.totalNumPossibleSchedule
            });
        default:
            return state;
    }
}