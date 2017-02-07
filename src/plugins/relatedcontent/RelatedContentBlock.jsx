import React, {Component} from "react";
import {DraftJS} from "megadraft";
import Autosuggest from 'react-autosuggest';
import Immutable from "immutable";
import axios from 'axios';
import config from "./config";
import icons from "../../icons/icons";
import ReactDOM from 'react-dom';

const {Modifier, EditorState, SelectionState} = DraftJS;
const {Map} = Immutable;

export default class RelatedContentBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: (this.props.data.data.href) ? false : true,
            href: (this.props.data.data.href || '') ,
            title: (this.props.data.data.title || ''),
            nid: (this.props.data.data.nid || ''),
            suggestions: []
        };

    }

    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        return axios.get( config.contentUrl + inputValue);

    }

    renderSuggestion = (suggestion) => {
        return (
            <span>{suggestion.title}</span>
        );
    }

    getSuggestionValue = (suggestion) => {
        return suggestion.title;
    }

    handleChange = (event, { newValue }) => {
        this.setState({
            title: newValue,
        });
    }

    handleClick = (e) => {
        e.preventDefault();
    }

    handleEdit = (e) => {
        this.setState({
            isEditing: true
        });
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestions(value)
            .then(function (response) {
                this.setState({
                    suggestions: response.data
                });
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    onSuggestionSelected = (event, { suggestion, suggestionValue, sectionIndex, method }) => {

        // @todo: create a function called "updateBlockData" that can be reused for any plugin
        const editorState = this.props.blockProps.editorState;
        const contentState = editorState.getCurrentContent();
        const newData = { type: 'relatedcontent', dataType: 'relatedcontent', data: {title: suggestion.title, href: suggestion.href, nid: suggestion.nid} };
        const targetSelection = SelectionState.createEmpty(this.props.container.props.block.get('key'));
        const newContentState = Modifier.mergeBlockData(contentState, targetSelection, Map(newData));

        this.props.blockProps.onChange(EditorState.push(
            editorState,
            newContentState,
            'change-block-data'
        ));

        this.setState({
            href: suggestion.href,
            title: suggestion.title,
            isEditing: false
        });

    };

    componentDidMount() {
        setTimeout(function(){
            this.setFocus()
        }.bind(this), 0);
    }

    setFocus = () => {
        let textInput = ReactDOM.findDOMNode(this.refs.autosuggest).querySelector('input');
        textInput.focus();
        textInput.select();
    }

    render() {

        const inputProps = {
            placeholder: 'Tipeá para buscar la nota...',
            value: this.state.title,
            onChange: this.handleChange,
            style: {display:"inline"}
        };

        return (
            <div className="related-content-block" onClick={this.handleClick} style={{position: 'relative'}}>
                <div className="links-related">
                    <span className="title">Leé también: </span>

                    <div className="link-container" style={{display:(this.state.isEditing) ? 'none' : 'block'}}>
                        <a className="link" href={this.state.href} target="_blank">{this.state.title}</a>
                        <icons.EditIcon onClick={this.handleEdit}/>
                    </div>
                    <div style={{display:(this.state.isEditing) ? 'block' : 'none'}}>
                        <Autosuggest
                            ref="autosuggest"
                            suggestions={this.state.suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            onSuggestionSelected={this.onSuggestionSelected}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            focusInputOnSuggestionClick={false}
                            focusFirstSuggestion={true}
                            inputProps={inputProps}
                        />
                    </div>
                </div>
            </div>
        );
    }
}