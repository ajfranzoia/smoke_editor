//import Editor from './editors/MyMegadraft.jsx';
import Editor from './components/RichTextEditor.jsx';
import React from 'react';
import ReactDOM from 'react-dom';
import ReactDOMServer from 'react-dom/server'

import {
    EditorState,
    ContentState,
    convertFromRaw,
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
            //var contentState = stateFromHTML(props.defaultValue);
            var editorState = EditorState.createWithContent(ContentState.createFromText(props.defaultValue));
        } else {
            var editorState = EditorState.createEmpty();
        }


        console.log(editorState);

        // @ref: https://facebook.github.io/react/docs/top-level-api.html#reactdomserver.rendertostaticmarkup
        var exportedContent = ReactDOMServer.renderToStaticMarkup(
            <Editor
                mode="export"
                editorState={editorState}
            />
        );
        // Set state
        this.state = {
            editorState: editorState,
            smokeJson: JSON.stringify(editorState),
            smokeHtml: exportedContent,
            name: name,
            id: this.props.targetElement.id
        };
    }

    onUpdateContent = (editorState) => {

        var exportedContent = ReactDOMServer.renderToStaticMarkup(
            <Editor
                mode="export"
                editorState={editorState}
            />
        );

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



