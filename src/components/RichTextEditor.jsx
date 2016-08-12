import React, {Component} from "react";
import {
    convertFromRaw,
    convertToRaw,
    EditorState,
    Editor,
    Entity,
    RichUtils,
    DefaultDraftBlockRenderMap,
    AtomicBlockUtils
} from 'draft-js';
import Atomic from './Atomic';
import {stateFromHTML} from 'draft-js-import-html';
import {stateToHTML} from 'draft-js-export-html';
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


    insertBlock = (entityKey) => {
        this.setState({
            editorState: AtomicBlockUtils.insertAtomicBlock(this.state.editorState, entityKey(), ' '),
        });
    };

    handleKeyCommand = (command) => {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

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

        // If the user changes block type before entering any text, we can
        // either style the placeholder or hide it. Let's just hide it now.
        let className = 'RichEditor-editor';
        var contentState = editorState.getCurrentContent();
        if (!contentState.hasText()) {
            if (contentState.getBlockMap().first().getType() !== 'unstyled') {
                className += ' RichEditor-hidePlaceholder';
            }
        }

            return (
                <div className="RichEditor-root">
                    <BlockStyleControls
                        editorState={editorState}
                        onToggleBlockType={this.toggleBlockType}
                        onToggleInlineStyle={this.toggleInlineStyle}
                        onInsertBlock={this.insertBlock}
                        plugins={this.props.plugins}
                    />

                    <div className={className} onClick={this.focus}>
                        <Editor
                            blockRenderMap={this.getBlockRenderMap()}
                            blockRendererFn={this.getBlockRenderer}
                            blockStyleFn={this.getBlockStyle}
                            editorState={editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                            placeholder=""
                            ref="editor"
                            spellCheck={true}
                        />
                    </div>

                </div>
            );

    }
}

const BlockStyleControls = (props) => {

    return (
        <div className="RichEditor-controls">

            {props.plugins.map((plugin) => {

                const Button = plugin.buttonComponent;

                let clickAction = '';
                switch (plugin.type){
                    case 'inline':
                        clickAction = props.onToggleInlineStyle;
                        break;
                    case 'block':
                        clickAction = props.onToggleBlockType;
                        break;
                    case 'atomic':
                        clickAction = props.onInsertBlock;
                        break;
                }


                return (
                    <Button
                        key={plugin.name}
                        plugin={plugin}
                        onClick={clickAction}
                    />
                );
            })}
        </div>
    );
};

export default RichTextEditor;