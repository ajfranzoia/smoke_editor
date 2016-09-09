import React, {Component} from "react";
import Autosuggest from 'react-autosuggest';
import {MegadraftIcons as icons} from "megadraft";
import {Modifier, EditorState, convertToRaw, RichUtils, SelectionState} from "draft-js";
import Immutable from "immutable";
import axios from 'axios';


const {Map} = Immutable;

// @todo: add config to set this url, it should not be hardcoded here
const contentUrl = "http://local.next.tn.com.ar:8080/smoke-editor/autocomplete/related-content/";


export default class RelatedContentBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: (this.props.data.data.href) ? false : true,
            href: (this.props.data.data.href || '') ,
            title: (this.props.data.data.title || ''),
            suggestions: []
        };

    }

    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        return axios.get( contentUrl + inputValue);

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
        const newData = Map({ type: 'relatedcontent', data: {title: suggestion.title, href: suggestion.href} });
        const targetSelection = SelectionState.createEmpty(this.props.container.props.block.get('key'));
        const newContentState = Modifier.mergeBlockData(contentState, targetSelection, newData);

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

    render() {

        const inputProps = {
            placeholder: 'Tipeá para buscar la nota...',
            value: this.state.title,
            onChange: this.handleChange,
            style: {display:"inline"}
        };


        if(this.state.isEditing){
            var linkEditable = <Autosuggest
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
        } else {
            var linkEditable = <span><a href={this.state.href} target="_blank">{this.state.title}</a> <icons.EditIcon onClick={this.handleEdit}/></span>
        }



        return (
            <div className="related-content-block" onClick={this.handleClick} style={{position: 'relative'}}>
                <div className="links-related">
                    <span className="title">Leé también: </span>
                    {linkEditable}
                </div>
            </div>
        );
    }
}