import React, {PureComponent} from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import "./ListBox.css"
import {HighlightButton} from "../button/highlight/HighlightButton";

export class ListBox extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedVals: []
        }
    }

    onSelect(val) {
        // for now don't really care about duplicates
        const newVals = [...this.state.selectedVals, val];
        console.log(newVals);
        this.props.onClick(newVals);
        this.setState({selectedVals: newVals});
    }

    onDeselect(val) {
        if (!this.state.selectedVals.includes(val))
            console.warn("Value to be deselected inside ListBox is somehow not contained in the ListBox!");

        const newVals = this.state.selectedVals.filter((selectedVal) => selectedVal !== val);
        this.props.onClick(newVals);
        this.setState({selectedVals: newVals});
    }

    render() {
        let buttons = this.props.values.map((value, index) => {
            const names = classNames("list-box__button", this.props.stylePerButton);
            return (
                <HighlightButton className={names}
                                 key={this.props.keyPrefix + index.toString()}
                                 label={value}
                                 onSelect={(e) => this.onSelect(e)}
                                 onDeselect={(e) => this.onDeselect(e)}/>
            );
        });

        const names = classNames(this.props.className, "list-box__container");
        return (
            <div className={names}>
                {buttons}
            </div>
        );
    }
}


ListBox.propTypes = {
    keyPrefix: PropTypes.string.isRequired,
    values: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
    stylePerButton: PropTypes.array
};