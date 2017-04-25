import React from 'react';
import {EditorState, ContentState} from 'draft-js';
import {editorStateFromRaw, editorStateToJSON} from "megadraft";
import  SmokeEditor from "./SmokeEditor"


export default class Smoke extends React.Component {
    constructor(props) {
        super(props);
        let editorState = null;

        if (props.defaultValue.length > 0) {
            const contentState = JSON.parse(props.defaultValue);
            editorState = editorStateFromRaw(contentState);
        } else {
            editorState = editorStateFromRaw(null);
        }

        this.state = {
            editorState: editorState,
            smokeJson: editorStateToJSON(editorState),
            name: this.props.name,
            id: this.props.id,
        };
    }

    onChange = (editorState) => {

        this.setState({
            editorState: editorState,
            smokeJson: editorStateToJSON(editorState),
        });
    };

    render() {

        const inputType = (this.props.debug === true) ? 'text' : 'hidden';
        return (
            <div>
                <SmokeEditor
                    editorState={this.state.editorState}
                    actions={this.props.actions}
                    plugins={this.props.plugins}
                    onChange={this.onChange}/>
                <input type={inputType} readOnly name={this.state.name} id={this.state.id} value={this.state.smokeJson}/>
            </div>
        )
    }
}