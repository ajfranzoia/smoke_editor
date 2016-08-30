import React from 'react';
import {EditorState, ContentState} from 'draft-js';
import actions from './Actions';
import {editorStateFromRaw, editorStateToJSON} from "megadraft";
import  CustomPlugins from "./Plugins";
import  SmokeEditor from "./SmokeEditor"


export default class Smoke extends React.Component {
    constructor(props) {
        super(props);

        if (props.defaultValue.length > 0) {
            const contentState = JSON.parse(props.defaultValue);
            var editorState = editorStateFromRaw(contentState);
        } else {
            var editorState = editorStateFromRaw(null);
        }

        this.customPlugins = CustomPlugins;

        this.state = {
            editorState: editorState,
            smokeJson: editorStateToJSON(editorState),
            name: name,
            id: this.props.targetElement.id
        };

        console.log(this)

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
                    onChange={this.onChange}
                    plugins={this.customPlugins}/>
                <input type={inputType} name={"smoke-" + this.state.id + "-json"} value={this.state.smokeJson}/>
                <input type={inputType} name={this.state.name} id={this.state.id} value={this.state.smokeHtml}/>
            </div>
        )
    }
}