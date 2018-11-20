import {configs} from "./config";
import moment from 'moment';
import React, {Component} from 'react';
import {Button} from "primereact/components/button/Button";

export class GCalendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            subsections: null,
        };
        this.state.subsections = this.props.subsections;

    }

    addEvents() {

        const CONFIG_KEY_CLIENT_ID = "client-id";
        const CONFIG_API_KEY = "api-key";
        const CONFIG_DISCOVERYDOCS = "discoveryDocs";
        const CONFIG_SCOPES = "scopes";

        let events = [];
        const GTIME_FORMAT = "YYYY-MM-DDTHH:mm:ssZ";
        const NUM_WEEKS_AHEAD = 5;
        const RECURRING_EVENT_RULE = "RRULE:FREQ=WEEKLY;COUNT=" + NUM_WEEKS_AHEAD;

        console.log(RECURRING_EVENT_RULE);

        for (let i = 0; i < this.state.subsections.length; i++) {
            const subsection = this.state.subsections[i];
            events.push({
                'summary': subsection.classTitle,
                'location': subsection.location,
                'description': subsection.description,
                'start': {
                    "dateTime": moment(subsection.timeInterval['start']).format(GTIME_FORMAT),
                    "timeZone": "America/Los_Angeles"
                },
                'end': {
                    "dateTime": moment(subsection.timeInterval['end']).format(GTIME_FORMAT),
                    "timeZone": "America/Los_Angeles"
                },
                'recurrence': [
                    RECURRING_EVENT_RULE
                ],
            });
        }
        // Client ID and API key from the Developer Console

        const CLIENT_ID = configs[CONFIG_KEY_CLIENT_ID];
        const API_KEY = configs[CONFIG_API_KEY];
        const DISCOVERY_DOCS = configs[CONFIG_DISCOVERYDOCS];
        const SCOPES = configs[CONFIG_SCOPES];

        async function addToGCalendar(isSignedIn) {
            if (isSignedIn) {
                for (let event of events) {
                    await window.gapi.client.calendar.events.insert({
                        'calendarId': 'primary',
                        'resource': event
                    });
                    console.log("Added " + event['summary'] + " on " + event['start']['dateTime']);
                }
            }
        }

        async function start() {
            await window.gapi.client.init({
                apiKey: API_KEY,
                clientId: CLIENT_ID,
                discoveryDocs: DISCOVERY_DOCS,
                scope: SCOPES
            });
            const GAPI_AUTH_INSTANCE = window.gapi.auth2.getAuthInstance();

            await GAPI_AUTH_INSTANCE.signIn();
            await addToGCalendar(GAPI_AUTH_INSTANCE.isSignedIn.get());
        }

        window.gapi.load('client:auth2', start);
    }

    render() {
        return (
            <Button
                id = "gcalendar-button"
                label = "Add to Google Calendar"
                className = "ui-button-info"
                onClick = {this.addEvents.bind(this, this.state.subsections)}
                disabled = {this.props.empty}/>
        );
    }
}
