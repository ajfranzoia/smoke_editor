import React from 'react';
//import Editor from './RichTextEditor';
import {stateToHTML} from 'draft-js-export-html'

import {
    EditorState,
    ContentState,
    convertFromRaw,
    convertFromHTML,
    DraftEditorContents,
    convertToRaw
} from 'draft-js';
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";


export default class SmokeEditor extends React.Component {
    constructor(props) {
        super(props);

        // Create the editorState
        /*if(props.defaultValue.length > 0) {
            var contentBlocks = convertFromHTML(props.defaultValue);
            var contentState = ContentState.createFromBlockArray(contentBlocks);
            var editorState = EditorState.createWithContent(contentState);

        } else {
            var editorState = EditorState.createEmpty();
        }*/

        var editorState = editorStateFromRaw(null);

        var exportedContent = stateToHTML(editorState.getCurrentContent());


        this.state = {
            editorState: editorState,
            smokeJson: editorStateToJSON(editorState),
            smokeHtml: exportedContent,
            name: name,
            id: this.props.targetElement.id
        };

    }

    onChange = (editorState) => {

        var exportedContent = stateToHTML(editorState.getCurrentContent());
        this.setState({
            editorState: editorState,
            smokeJson: editorStateToJSON(editorState),
            smokeHtml: exportedContent
        });
    }

    render() {

        const inputType = (this.props.debug === true) ? 'text' : 'hidden';

        return (
            <div>

                <MegadraftEditor
                    editorState={this.state.editorState}
                    onChange={this.onChange}/>

                <input type={inputType} name={"smoke-" + this.state.id + "-json"} value={this.state.smokeJson} />
                <input type={inputType} name={this.state.name} id={this.state.id} value={this.state.smokeHtml} />

            </div>
        )
    }
}