
export const SET_DAY_PREFERENCE = "SET_DAY_PREFERENCE";

export function setDayPreference(dayPreference) {
    return {
        type: SET_DAY_PREFERENCE,
        dayPreference: dayPreference
    }
}

export const SET_START_TIME_PREFERENCE = "SET_START_TIME_PREFERENCE";

export function setStartTimePreference(timePreference) {
    return {
        type: SET_START_TIME_PREFERENCE,
        startTimePreference: timePreference
    }
}

export const SET_END_TIME_PREFERENCE = "SET_END_TIME_PREFERENCE";

export function setEndTimePreference(timePreference) {
    return {
        type: SET_END_TIME_PREFERENCE,
        endTimePreference: timePreference
    }
}

export const ACTIVATE_SCHEDULE_PREFERENCES = "ACTIVATE_SCHEDULE_PREFERENCES";

export function activate() {
    return {
        type: ACTIVATE_SCHEDULE_PREFERENCES,
        activated: true
    }
}

export const DEACTIVATE_SCHEDULE_PREFERENCES = "DEACTIVATE_SCHEDULE_PREFERENCES";

export function deactivate() {
    return {
        type: DEACTIVATE_SCHEDULE_PREFERENCES,
        activated: false
    }
}