import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {ModalPortal} from 'react-modal-dialog';

// Render into subtree is necessary for parent contexts to transfer over
// For example, for react-router
const renderSubtreeIntoContainer = ReactDOM.unstable_renderSubtreeIntoContainer;

export default class SmokeModalPortal extends ModalPortal {
    componentDidMount = () => {
        // Create a div and append it to the body
        this._target = document.body.appendChild(document.createElement('div'));
        this._target.setAttribute("class", "modal-portal");

        // Mount a component on that div
        this._component = renderSubtreeIntoContainer(this, this.props.children, this._target);
    };
}
