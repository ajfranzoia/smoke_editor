import React, {Component} from "react";
import {
    convertFromRaw,
    convertToRaw,
    Editor,
    EditorState,
    RichUtils,
    DefaultDraftBlockRenderMap,
} from 'draft-js';
import KalturaComponent from './KalturaComponent.jsx';
import {insertKaltura} from '../Helpers/insertKaltura.jsx';


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



        this.handleKeyCommand = (command) => this._handleKeyCommand(command);
        this.toggleBlockType = (type) => this._toggleBlockType(type);
        this.toggleInlineStyle = (style) => this._toggleInlineStyle(style);


        this._blockRenderer = (block) => {
            if (block.getType() === 'atomic') {
                return {
                    component: KalturaComponent,
                    editable: false,
                    props: {
                        /*onStartEdit: (blockKey) => {
                            var {liveTeXEdits} = this.state;
                            this.setState({liveTeXEdits: liveTeXEdits.set(blockKey, true)});
                        },
                        onFinishEdit: (blockKey) => {
                            var {liveTeXEdits} = this.state;
                            this.setState({liveTeXEdits: liveTeXEdits.remove(blockKey)});
                        },
                        onRemove: (blockKey) => this._removeTeX(blockKey),
                        */
                    },
                };
            }
            return null;
        };

        this._insertKaltura = () => {
            this.setState({
                //liveTeXEdits: Map(),
                editorState: insertKaltura(this.state.editorState),
            });
        };



    }

    _handleKeyCommand(command) {
        const {editorState} = this.state;
        const newState = RichUtils.handleKeyCommand(editorState, command);
        if (newState) {
            this.onChange(newState);
            return true;
        }
        return false;
    }

    _toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    _toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    updateContent(editorState) {
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

        if(this.props.mode == 'export'){
            return (
                <Editor
                blockRenderMap={customBlockRendering}
                //blockRendererFn={myBlockRenderer}
                blockStyleFn={getBlockStyle}
                customStyleMap={styleMap}
                editorState={editorState}
                placeholder=""
                ref="editor"
                readOnly={true}
            />
            );
        } else {


            return (
                <div className="RichEditor-root">
                    <BlockStyleControls
                        mode={this.props.mode}
                        editorState={editorState}
                        onToggle={this.toggleBlockType}
                        insertKaltura={this._insertKaltura}
                    />
                    <InlineStyleControls
                        mode={this.props.mode}
                        editorState={editorState}
                        onToggle={this.toggleInlineStyle}
                    />

                    <div className={className} onClick={this.focus}>
                        <Editor
                            blockRenderMap={extendedBlockRenderMap}
                            blockRendererFn={this._blockRenderer}
                            blockStyleFn={getBlockStyle}
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
}


/**
 * @ref: https://github.com/facebook/draft-js/pull/387
 */

const customBlockRendering = Map({
    'paragraph': {
        element: 'p',
    },
    'unstyled': {
        element: 'p',
    },
    'subtitle': {
        element: 'h2',
    },
});

const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(customBlockRendering);


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

function getBlockStyle(block) {
    switch (block.getType()) {
        case 'blockquote': return 'RichEditor-blockquote';
        case 'subtitle': return 'subtitle';
        default: return null;
    }
}

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

const BASIC_BLOCK_TYPES = [
];
const ADVANCED_BLOCK_TYPES = [
    {label: 'H1', style: 'header-one'},
    {label: 'H2', style: 'header-two'},
    {label: 'H3', style: 'header-three'},
    {label: 'H4', style: 'header-four'},
    {label: 'H5', style: 'header-five'},
    {label: 'H6', style: 'header-six'},
    {label: 'Blockquote', style: 'blockquote'},
    {label: 'UL', style: 'unordered-list-item'},
    {label: 'OL', style: 'ordered-list-item'},
    {label: 'Code Block', style: 'code-block'},
    {label: 'Subtitle', style: 'subtitle'},
];

const BlockStyleControls = (props) => {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    const BLOCK_TYPES = (props.mode == 'basic')? BASIC_BLOCK_TYPES : ADVANCED_BLOCK_TYPES ;

    if(props.mode == 'basic') {
        var kalturaButton = '';
    } else {
        var kalturaButton = <span className="RichEditor-styleButton" onMouseDown={props.insertKaltura}>
              Video Kaltura
            </span>
    }



    return (
        <div className="RichEditor-controls">
            {BLOCK_TYPES.map((type) =>
                <StyleButton
                    key={type.label}
                    active={type.style === blockType}
                    label={type.label}
                    onToggle={props.onToggle}
                    style={type.style}
                />
            )}
            {kalturaButton}
        </div>
    );
};

var BASIC_INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
];
var ADVANCED_INLINE_STYLES = [
    {label: 'Bold', style: 'BOLD'},
    {label: 'Italic', style: 'ITALIC'},
    {label: 'Underline', style: 'UNDERLINE'},
    {label: 'Monospace', style: 'CODE'},
];

const InlineStyleControls = (props) => {
    var currentStyle = props.editorState.getCurrentInlineStyle();
    const INLINE_STYLES = (props.mode == 'basic')? BASIC_INLINE_STYLES : ADVANCED_INLINE_STYLES ;
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