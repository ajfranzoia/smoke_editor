import React from 'react';
import {EditorState, ContentState} from 'draft-js';
import actions from '../actions';
import {editorStateFromRaw, editorStateToJSON} from "megadraft";
import  SmokeEditor from "./SmokeEditor"
import stateToHTML from 'draft-js-export-html'
import DOMValidator from "../Helpers/domValidator";


export default class Smoke extends React.Component {
    constructor(props) {
        super(props);

        if (props.defaultValue.length > 0) {
            const contentState = JSON.parse(props.defaultValue);
            var editorState = editorStateFromRaw(contentState);
        } else {
            var editorState = editorStateFromRaw(null);
        }

        this.state = {
            editorState: editorState,
            smokeJson: editorStateToJSON(editorState),
            //smokeHtml: stateToHTML(editorState.getCurrentContent()),
            fieldName: this.props.fieldName,
            name: this.props.name,
            id: this.props.id,
        };

    }

    onChange = (editorState) => {

        this.setState({
            editorState: editorState,
            smokeJson: editorStateToJSON(editorState),
            //smokeHtml: stateToHTML(editorState.getCurrentContent())
        });
    }

    render() {

        const inputType = (this.props.debug === true) ? 'text' : 'hidden';
        
        return (
            <div>
                <SmokeEditor
                    editorState={this.state.editorState}
                    actions={actions}
                    onChange={this.onChange}/>
                <input type={inputType} readOnly name={"smoke-" + this.state.fieldName + "-json"} value={this.state.smokeJson}/>
                <input type="hidden" readOnly name={this.state.name} id={this.state.id} value=" - "/>
            </div>
        )
    }
}