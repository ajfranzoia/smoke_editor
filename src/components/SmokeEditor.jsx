import React, {Component} from "react";
import {MegadraftEditor, Toolbar, Sidebar} from "megadraft";
import {DefaultDraftBlockRenderMap, Editor} from 'draft-js';
import Immutable from "immutable";
const {Map} = Immutable;



export default class SmokeEditor extends MegadraftEditor {
    constructor(props) {
        super(props);
    }

    blockStyleFn = (contentBlock) => {
        const blockType = contentBlock.getType();
        let style = null;
        this.props.actions.forEach(function (action) {
            if(blockType == action.style){
                style =  action.className;
            }
        });
        return style;
    }

    BlockRenderingMap = () => {

        const customBlockRendering = Map({
            'paragraph': {
                element: 'p',
            },
            'unstyled': {
                element: 'p',
            }
        });
        return DefaultDraftBlockRenderMap.merge(customBlockRendering);
    }


    render() {
        const {editorState, stripPastedStyles, spellCheck} = this.props;
        const plugins = this.plugins;

        return (
            <div className="megadraft">
                <div
                    className="megadraft-editor"
                    id="megadraft-editor"
                    ref="editor">
                    <Sidebar
                        plugins={plugins}
                        editorState={editorState}
                        onChange={this.onChange}/>
                    <Editor
                        blockRenderMap={this.BlockRenderingMap()}
                        readOnly={this.state.readOnly}
                        plugins={plugins}
                        blockRendererFn={this.mediaBlockRenderer}
                        blockStyleFn={this.blockStyleFn}
                        onTab={this.onTab}
                        handleKeyCommand={this.handleKeyCommand}
                        handleReturn={this.handleReturn}
                        stripPastedStyles={stripPastedStyles}
                        spellCheck={spellCheck}
                        keyBindingFn={this.externalKeyBindings}
                        editorState={editorState}
                        placeholder={this.props.placeholder}
                        onChange={this.onChange} />
                    <Toolbar
                        editor={this.refs.editor}
                        editorState={editorState}
                        onChange={this.onChange}
                        actions={this.actions}/>
                </div>
            </div>
        );
    }

}