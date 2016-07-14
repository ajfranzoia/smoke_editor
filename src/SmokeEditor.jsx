//import Editor from './editors/MyMegadraft.jsx';
import Editor from './editors/RichTextEditor.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import {
    EditorState,
    ContentState,
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
            //var contentState = stateFromHTML(props.defaultValue);
            var editorState = EditorState.createWithContent(ContentState.createFromText(props.defaultValue));
        } else {
            var editorState = EditorState.createEmpty();
        }

        // Set state
        this.state = {
            editorState: editorState,
            smokeJson: JSON.stringify(editorState),
            smokeHtml: stateToHTML(editorState.getCurrentContent()),
            name: name,
            id: this.props.targetElement.id
        };
    }

    onUpdateContent = (editorState) => {

        let options = {
            inlineStyles: {
                // Override default element (`strong`).
                BOLD: {element: 'b'},
                ITALIC: {
                    // Add custom attributes. You can also use React-style `className`.
                    attributes: {class: 'foo'},
                    // Use camel-case. Units (`px`) will be added where necessary.
                    style: {fontSize: 12}
                },
                // Use a custom inline style. Default element is `span`.
                RED: {style: {color: '#900'}},
            },
        };

        this.setState({
            smokeJson: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
            smokeHtml: stateToHTML(editorState.getCurrentContent(), options)
        });
    }

    render() {
        return (
            <div>
                <Editor
                    mode={this.props.config.mode}
                    updateContent={this.onUpdateContent}
                    editorState={this.state.editorState}
                />

                <input type="hidden" name={"smoke-" + this.state.id + "-json"} value={this.state.smokeJson} />
                <input type="hidden" name={this.state.name} id={this.state.id} value={this.state.smokeHtml} />

            </div>
        )
    }
}

// Export component as function
// @todo: move this function to another place
function SmokeEditorRender(element, config) {

    // @todo: validar ACA -> ver "playControls" (hudson/js/components)
    var textarea = element.querySelector('textarea');
    var defaultValue = (typeof textarea.value === 'undefined') ? '' : textarea.value ;
    ReactDOM.render(
        <SmokeEditor
            config={config}
            targetElement={element}
            defaultValue={defaultValue}
        />,
        element
    );
}
window.SmokeEditorRender = SmokeEditorRender;



