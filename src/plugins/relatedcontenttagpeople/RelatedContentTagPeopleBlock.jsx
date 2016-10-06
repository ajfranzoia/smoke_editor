import React, {Component}   from "react";
import {Modifier, EditorState, convertToRaw, RichUtils, SelectionState} from "draft-js";
import Autosuggest          from 'react-autosuggest';
import Immutable            from "immutable";
import axios                from 'axios';
import config               from "./config";
import icons                from "../../icons/icons";

const {Map} = Immutable;

export default class RelatedContentTagPeopleBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing:      (this.props.data.data.name) ? false : true,
            tid:            (this.props.data.data.tid           || ''),
            name:           (this.props.data.data.name          || ''),
            vocabulary:     (this.props.data.data.vocabulary    || ''),
            suggestions:    []
        };
    }

    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        return axios.get(config.contentTagPeopleUrl + inputValue);

    }

    renderSuggestion = (suggestion) => {
        return (
            <span>{suggestion.name}</span>
        );
    }

    getSuggestionValue = (suggestion) => {
        return suggestion.name;
    }

    handleChange = (event, { newValue }) => {
        this.setState({
            name: newValue,
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
        const newData = { type: 'relatedcontenttagpeople', dataType: 'relatedcontenttagpeople', data: {tid: suggestion.tid, vacabulary: suggestion.vacabulary, } };
        const targetSelection = SelectionState.createEmpty(this.props.container.props.block.get('key'));
        const newContentState = Modifier.mergeBlockData(contentState, targetSelection, Map(newData));

        this.props.blockProps.onChange(EditorState.push(
            editorState,
            newContentState,
            'change-block-data'
        ));

        this.setState({
            tid:        suggestion.tid,
            name:       suggestion.name,
            vocabulary: suggestion.vocabulary,
            isEditing:  false
        });
    };

    render() {
        const inputProps = {
            placeholder: 'Tipeá para buscar Tags o Personajes...',
            value: this.state.name,
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