import Editor from './components/RichTextEditor.jsx';
import React from 'react';
//import ReactDOMServer from 'react-dom/server'
import {stateToHTML} from 'draft-js-export-html'

import {
    EditorState,
    ContentState,
    convertFromRaw,
    convertFromHTML,
    DraftEditorContents,
    convertToRaw
} from 'draft-js';


export default class SmokeEditor extends React.Component {
    constructor(props) {
        super(props);

        if (this.props.targetElement.id.length === 0) {
            throw new Error("The target element must have an ID");
        }

        var textarea = this.props.targetElement.querySelector('textarea');
        if(typeof textarea === 'undefined'){
            throw new Error("A textarea must exist inside the targetElement");
        }

        let name = textarea.getAttribute("name");
        if(typeof name === 'undefined'){
            throw new Error("The textarea must have a name attribute");
        }

        // Create the editorState
        if(props.defaultValue.length > 0) {
            var contentBlocks = convertFromHTML(props.defaultValue);
            var contentState = ContentState.createFromBlockArray(contentBlocks);
            var editorState = EditorState.createWithContent(contentState);

        } else {
            var editorState = EditorState.createEmpty();
        }

        // @ref: https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostaticmarkup
        /*var exportedContent = ReactDOMServer.renderToStaticMarkup(
             <Editor
                 mode="export"
                 editorState={editorState}
             />
         );*/
        var exportedContent = stateToHTML(editorState.getCurrentContent());
        this.state = {
            editorState: editorState,
            smokeJson: JSON.stringify(editorState),
            smokeHtml: exportedContent,
            name: name,
            id: this.props.targetElement.id
        };
    }

    onUpdateContent = (editorState) => {

        /*var exportedContent = ReactDOMServer.renderToStaticMarkup(
            <Editor
                mode="export"
                editorState={editorState}
            />
        );*/
        var exportedContent = stateToHTML(editorState.getCurrentContent());
        this.setState({
            smokeJson: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            smokeHtml: exportedContent
        });
    }

    render() {


        return (
            <div>
                <Editor
                    mode={this.props.config.mode}
                    updateContent={this.onUpdateContent}
                    editorState={this.state.editorState}
                    readOnly={false}
                />

                <input type="text" name={"smoke-" + this.state.id + "-json"} value={this.state.smokeJson} />
                <input type="text" name={this.state.name} id={this.state.id} value={this.state.smokeHtml} />

            </div>
        )
    }
}