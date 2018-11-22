import {GENERATE_SCHEDULE, INCREMENT_PROGRESS, RECEIVE_SCHEDULE} from "../actions/ScheduleGenerationActions";
import WebWorker from "./WebWorker";
import {SGWorkerCode} from "../schedulegeneration/SGWorker";



export const SGMiddleWare = store => {
    const worker = new WebWorker(SGWorkerCode);
    worker.onmessage = msg => {
        let {type, generationResult, amount} = msg.data;
        switch(type) {
            case "FINISHED_GENERATION":
                store.dispatch({type: RECEIVE_SCHEDULE, generating: false, generationResult: generationResult});
                break;
            case "INCREMENT_PROGRESS":
                store.dispatch({type: INCREMENT_PROGRESS, amount: amount})
        }
    };

    return next => action => {
        if (!action)
            return next(action);

        if (action.type !== GENERATE_SCHEDULE)
            return next(action);

        worker.postMessage(action);
        return next(action);
    }
};