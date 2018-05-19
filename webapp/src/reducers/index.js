import {combineReducers} from 'redux';
import ClassSelection from './ClassSelection';
import ScheduleGeneration from './ScheduleGeneration';
import ClassInput from './ClassInputReducer';

const reducers = combineReducers({
    ClassSelection,
    ScheduleGeneration,
    ClassInput
});

export default reducers;