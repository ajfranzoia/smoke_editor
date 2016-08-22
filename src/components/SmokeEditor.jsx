import React from 'react';
import {stateToHTML} from 'draft-js-export-html';

import {
    EditorState,
    ContentState,
    convertFromRaw,
    convertFromHTML,
    DraftEditorContents,
    convertToRaw
} from 'draft-js';
import actions from '../actions';
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";


export default class SmokeEditor extends React.Component {
    constructor(props) {
        super(props);

        if(props.defaultValue.length > 0){
            const contentState = JSON.parse(props.defaultValue);
            var editorState = editorStateFromRaw(contentState);
        } else {
            var editorState = editorStateFromRaw(null);
        }


        this.state = {
            editorState: editorState,
            smokeJson: editorStateToJSON(editorState),
            //smokeHtml: stateToHTML(editorState.getCurrentContent()),
            name: name,
            id: this.props.targetElement.id
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

                <MegadraftEditor
                    editorState={this.state.editorState}
                    actions={actions}
                    onChange={this.onChange}/>

                <input type={inputType} name={"smoke-" + this.state.id + "-json"} value={this.state.smokeJson} />
                <input type={inputType} name={this.state.name} id={this.state.id} value={this.state.smokeHtml} />

            </div>
        )
    }
}