import React from 'react';
import ClassInputContainer from "../containers/ClassInputContainer";
import {
    setClassTypesToIgnore,
    setCourseNum,
    setCourseNums,
    setDepartment,
    setDepartments,
    setInstructor
} from "../actions/classinput/ClassInputMutator";
import {getInputHandler as getReduxInputHandler} from "../actions/classinput/ClassInputHandler";
import {applyMiddleware, createStore} from "redux";
import reducers from "../reducers";
import thunk from "redux-thunk";
import {mount} from 'enzyme';
import {enterEditMode} from "../actions/classinput/ClassInputActions";

function getInputHandler(store) {
    let fn = getReduxInputHandler();
    return fn(store.dispatch, store.getState);
}

describe("Ensuring ClassInputHandler can handle changes in the autocomplete fields correctly", () => {
    let store;

    beforeEach((done) => {
        store = createStore(reducers, applyMiddleware(thunk));
        done();
    });

    test('Creates a very bare class from input with just department and course number', () => {
        const classInput = mount(
            <ClassInputContainer store={store}/>
        );

        store.dispatch(setDepartment("CSE"));
        store.dispatch(setCourseNum("12"));

        let inputHandler = getInputHandler(store);

        const newClass = inputHandler.buildClassFromInput();
        const result = {
            classTitle: "CSE 12",
            department: "CSE",
            courseNum: "12",
            classTypesToIgnore: [],
            priority: null,
            instructor: null
        };

        chaiExpect(result).to.eql(newClass);
    });

    test('Creates a more complex class from input', () => {
        const classInput = mount(
            <ClassInputContainer store={store}/>
        );

        store.dispatch(setDepartment("CSE"));
        store.dispatch(setCourseNum("12"));
        store.dispatch(setClassTypesToIgnore(["LE", "blah"]));
        store.dispatch(setInstructor("Mr. Cameron Trando"));

        let inputHandler = getInputHandler(store);

        const newClass = inputHandler.buildClassFromInput();
        const result = {
            classTitle: "CSE 12",
            department: "CSE",
            courseNum: "12",
            classTypesToIgnore: ["LE", "blah"],
            priority: null,
            instructor: "Mr. Cameron Trando"
        };

        chaiExpect(result).to.eql(newClass);
    });

    test('Making sure other fields are nulled out when changing department field', () => {
        const classInput = mount(
            <ClassInputContainer store={store}/>
        );

        store.dispatch(setDepartments(["CSE", "DSC"]));
        store.dispatch(setDepartment("CSE"));
        store.dispatch(setCourseNum("12"));
        store.dispatch(setClassTypesToIgnore(["LE", "blah"]));
        store.dispatch(setInstructor("Mr. Cameron Trando"));

        let inputHandler = getInputHandler(store);
        inputHandler.onDepartmentChange("DSC");

        let state = store.getState().ClassInput;

        chaiExpect(state.department).to.equal("DSC");
        chaiExpect(state.courseNum).to.equal(null);
        chaiExpect(state.instructor).to.equal(null);
        chaiExpect(state.classTypesToIgnore).to.eql([]);
    });

    test('Making sure other fields are not nulled out if department field is edited but its value is not altered', () => {
        const classInput = mount(
            <ClassInputContainer store={store}/>
        );

        store.dispatch(setDepartments(["CSE", "DSC"]));
        store.dispatch(setDepartment("CSE"));
        store.dispatch(setCourseNum("12"));
        store.dispatch(setClassTypesToIgnore(["LE", "blah"]));
        store.dispatch(setInstructor("Mr. Cameron Trando"));

        let inputHandler = getInputHandler(store);
        inputHandler.onDepartmentChange("CSE");

        let state = store.getState().ClassInput;

        chaiExpect(state.department).to.equal("CSE");
        chaiExpect(state.courseNum).to.equal("12");
        chaiExpect(state.instructor).to.equal("Mr. Cameron Trando");
        chaiExpect(state.classTypesToIgnore).to.eql(["LE", "blah"]);
    });

    test('Making sure priority, ignored class types, and instructors are nulled out when changing courseNum field', () => {
        const classInput = mount(
            <ClassInputContainer store={store}/>
        );

        store.dispatch(setDepartments(["CSE", "DSC"]));
        store.dispatch(setCourseNums(["11", "12"]));
        store.dispatch(setDepartment("CSE"));
        store.dispatch(setCourseNum("12"));
        store.dispatch(setClassTypesToIgnore(["LE", "blah"]));
        store.dispatch(setInstructor("Mr. Cameron Trando"));

        let inputHandler = getInputHandler(store);
        inputHandler.onCourseNumChange("11");

        let state = store.getState().ClassInput;

        // department should still stay the same
        chaiExpect(state.department).to.equal("CSE");
        chaiExpect(state.courseNum).to.equal("11");
        chaiExpect(state.instructor).to.equal(null);
        chaiExpect(state.classTypesToIgnore).to.eql([]);
    });

    test('Making sure priority, ignored class types, and instructors are unchanged when not making any changes to courseNum field', () => {
        const classInput = mount(
            <ClassInputContainer store={store}/>
        );

        store.dispatch(setDepartments(["CSE", "DSC"]));
        store.dispatch(setCourseNums(["11", "12"]));
        store.dispatch(setDepartment("CSE"));
        store.dispatch(setCourseNum("12"));
        store.dispatch(setClassTypesToIgnore(["LE", "blah"]));
        store.dispatch(setInstructor("Mr. Cameron Trando"));

        let inputHandler = getInputHandler(store);
        inputHandler.onCourseNumChange("12");

        let state = store.getState().ClassInput;

        // department should still stay the same
        chaiExpect(state.department).to.equal("CSE");
        chaiExpect(state.courseNum).to.equal("12");
        chaiExpect(state.instructor).to.equal("Mr. Cameron Trando");
        chaiExpect(state.classTypesToIgnore).to.eql(["LE", "blah"]);
    });

    describe("UI actions on class input operations", () => {
        it("Makes a popup occur when hitting remove class in ClassInput", () => {
            const classInput = mount(
                <ClassInputContainer store={store}/>
            );

            store.dispatch(setDepartments(["CSE", "DSC"]));
            store.dispatch(setCourseNums(["11", "12"]));
            store.dispatch(setDepartment("CSE"));
            store.dispatch(setCourseNum("12"));

            let inputHandler = getInputHandler(store);
            inputHandler.handleAdd();

            store.dispatch(enterEditMode("0"));
            inputHandler.handleRemove();

            let state = store.getState().ClassInput;
            chaiExpect(state.messageHandler.messageQueue).to.have.lengthOf(1);
            chaiExpect(state.messageHandler.messageQueue[0]).to.match(/Removed/);
        });
    });
});