import React from "react";
import {shallow} from 'enzyme';
import WeekCalendar from "../components/schedule/calendar/WeekCalendar";

import {expect} from 'chai';
import {testData, testSchedule} from "./utils/ScheduleBuidlerTestUtils";
import {getStore} from "./utils/ReduxUtils";
import {setClassData, setCurrentSchedule} from "../actions/schedule/ScheduleActions";
import {getEvents} from "../utils/download/GCalendar";

describe('Google calendar integration', () => {

    let store;
    beforeEach(() => {
        store = getStore();
    });

    test('Renders correctly', () => {
        expect(shallow(<WeekCalendar/>).find("#gcalendar-button").length).to.equal(1);
    });

    test("Gets the correct events from the schedule", () => {
        store.dispatch(setClassData(testData));
        store.dispatch(setCurrentSchedule(testSchedule));

        let state = store.getState().Schedule;

        let events = getEvents(state.currentSchedule, state.classData);

        chaiExpect(events).to.have.lengthOf(testSchedule.length);

        let oneEvent = events[0];
        chaiExpect(oneEvent.summary).to.not.equal(null);
    });
});

