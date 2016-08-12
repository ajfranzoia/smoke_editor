import React, {Component} from "react";
import {
    EditorState,
    Editor,
    RichUtils,
    DefaultDraftBlockRenderMap,
    AtomicBlockUtils
} from 'draft-js';
import Toolbar from './Toolbar';
import Atomic from './Atomic';
import immutable from 'immutable';

const {Map} = immutable;

class RichTextEditor extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            editorState: this.props.editorState
        };

        this.focus = () => this.refs.editor.focus();
        this.onChange = (editorState) => {
            this.setState({editorState});
            this.updateContent(editorState);
        }


    }

    /**
     * @ref: https://github.com/facebook/draft-js/pull/387
     */
    getBlockRenderMap = () => {

        // some custom mappings
        // @todo: add this to an external config file
        let blockRenderMap = Map({
            'paragraph': {
                element: 'p',
            },
            'unstyled': {
                element: 'p',
            }
        });

        // plugins mappings
        this.props.plugins.forEach(
            function (plugin) {
                if(typeof plugin.element != 'undefined' && typeof plugin.style != 'undefined') {
                    blockRenderMap = blockRenderMap.set(plugin.style, { element: plugin.element });
                }
            }
        );

        // merge with default mappings and return
        blockRenderMap = blockRenderMap.merge(DefaultDraftBlockRenderMap);

        return blockRenderMap;

    }

    // Handles rendering for atomic blocks
    getBlockRenderer = (block) => {
        if (block.getType() === 'atomic') {
            return {
                component: Atomic, // Atomic decides which component to render
                editable: false,
                props: {
                    plugins: this.props.plugins
                },
            };
        }
        return null;
    };


    getBlockStyle = (block) => {
        const blockType = block.getType();
        let style = null;
        this.props.plugins.forEach(function (plugin) {
            if(blockType === plugin.style){
                style = plugin.style;
            }
        });

        return style;

    }

    handleKeyCommand = (command) => {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }
    
    insertCustomBlock = (entityKey) => {
        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey(), ' '),
        });
    };


    toggleBlockType = (blockType) => {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    toggleInlineStyle = (inlineStyle) => {

        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    updateContent = (editorState) => {
        this.props.updateContent(editorState);
    }

    render() {
        const {editorState} = this.state;

        return (
            <div className="RichEditor-root">
                <Toolbar
                    editorState={editorState}
                    onToggleBlockType={this.toggleBlockType}
                    onToggleInlineStyle={this.toggleInlineStyle}
                    onInsertCustomBlock={this.insertCustomBlock}
                    plugins={this.props.plugins}
                />
                <div className="RichEditor-editor" onClick={this.focus}>
                    <Editor
                        blockRenderMap={this.getBlockRenderMap()}
                        blockRendererFn={this.getBlockRenderer}
                        blockStyleFn={this.getBlockStyle}
                        editorState={editorState}
                        handleKeyCommand={this.handleKeyCommand}
                        onChange={this.onChange}
                        ref="editor"
                        spellCheck={true}
                    />
                </div>

            </div>
        );

    }
}

export default RichTextEditor;