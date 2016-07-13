import Editor from './editors/MyMegadraft.jsx';
//import Editor from './editors/RichTextEditor.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    EditorState,
    convertFromRaw,
    convertToRaw
} from 'draft-js';


import {stateFromHTML} from 'draft-js-import-html';
import {stateToHTML} from 'draft-js-export-html';

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
            var contentState = stateFromHTML(props.defaultValue);
            var editorState = EditorState.createWithContent(contentState);
        } else {
            var editorState = EditorState.createEmpty();
        }

        // Set state
        this.state = {
            editorState: editorState,
            tndraftJson: JSON.stringify(editorState),
            tndraftHtml: stateToHTML(editorState.getCurrentContent()),
            name: name,
            id: this.props.targetElement.id
        };
    }

    onUpdateContent = (editorState) => {
        this.setState({
            tndraftJson: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            tndraftHtml: stateToHTML(editorState.getCurrentContent())
        });
    }

    render() {
        return (
            <div>
                <Editor
                    mode={this.props.mode}
                    updateContent={this.onUpdateContent}
                    editorState={this.state.editorState}
                />

                <input type="text" name={"tndraft-" + this.state.id + "-json"} value={this.state.tndraftJson} />
                <input type="text" name={this.state.name} id={this.state.id} value={this.state.tndraftHtml} />

            </div>
        )
    }
}

// Export component as function
// @todo: move this function to another place
function SmokeEditorRender(element) {

    // @todo: validar ACA -> ver "playControls" (hudson/js/components)
    var textarea = element.querySelector('textarea');
    var defaultValue = (typeof textarea.value === 'undefined') ? '' : textarea.value ;
    ReactDOM.render(
        <SmokeEditor
            targetElement={element}
            defaultValue={defaultValue}
        />,
        element
    );
}
window.SmokeEditorRender = SmokeEditorRender;



