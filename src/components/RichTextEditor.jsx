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
import Atomic from './Atomic.jsx';
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

        /*switch (block.getType()) {
            case 'blockquote': return 'RichEditor-blockquote';
            case 'subtitle': return 'subtitle';
            default: return null;
        }*/
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
                        customStyleMap={styleMap}
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




// Custom overrides for "code" style.
const styleMap = {
    CODE: {
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
        fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
        fontSize: 16,
        padding: 2,
    },
    SUBTITLE: {
        backgroundColor: 'red',
    },
};




class StyleButton extends React.Component {
    constructor() {
        super();
        this.onToggle = (e) => {
            e.preventDefault();
            this.props.onToggle(this.props.style);
        };
    }

    render() {
        let className = 'RichEditor-styleButton';
        if (this.props.active) {
            className += ' RichEditor-activeButton';
        }

        return (
            <span className={className} onMouseDown={this.onToggle}>
              {this.props.label}
            </span>
        );
    }
}
/*
const BLOCK_TYPES = [
    //{label: 'H1', style: 'header-one'},
    //{label: 'H2', style: 'header-two'},
    //{label: 'H3', style: 'header-three'},
    //{label: 'H4', style: 'header-four'},
    //{label: 'H5', style: 'header-five'},
    //{label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    //{label: 'UL', style: 'unordered-list-item'},
    //{label: 'OL', style: 'ordered-list-item'},
    //{label: 'Code Block', style: 'code-block'},
    {label: 'Subtitle', style: 'subtitle'},
];*/

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();


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
/*
var INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    //{label: 'Underline', style: 'UNDERLINE'},
    //{label: 'Monospace', style: 'CODE'},
];*/

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    return (
        <div className="RichEditor-controls">
            {INLINE_STYLES.map(type =>
                <StyleButton
                    key={type.label}
                    active={currentStyle.has(type.style)}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
        </div>
    );
};

export default RichTextEditor;