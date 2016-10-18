import React, {Component}   from "react";
import {Modifier, EditorState, convertToRaw, RichUtils, SelectionState} from "draft-js";
import Autosuggest          from 'react-autosuggest';
import Immutable            from "immutable";
import axios                from 'axios';
import config               from "./config";
import icons                from "../../icons/icons";

const {Map} = Immutable;

export default class KalturaBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing:  (this.props.data.data.title)    ? false : true,
            title:      (this.props.data.data.title     || ''),
            nid:        (this.props.data.data.nid       || ''),
            loading:    false,
            suggestions: []
        };
    }

    getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        return axios.get(config.kalturaVideoSuggest + inputValue);

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
        const editorState       = this.props.blockProps.editorState;
        const contentState      = editorState.getCurrentContent();
        const newData           = { type: 'kaltura', dataType: 'kaltura', data: {title: suggestion.title, nid: suggestion.nid} };
        const targetSelection   = SelectionState.createEmpty(this.props.container.props.block.get('key'));
        const newContentState   = Modifier.mergeBlockData(contentState, targetSelection, Map(newData));

        this.props.blockProps.onChange(EditorState.push(
            editorState,
            newContentState,
            'change-block-data'
        ));

        this.setState({
            nid:        suggestion.nid,
            title:      suggestion.title,
            isEditing:  false
        });
    };

    render() {

        const inputProps = {
            placeholder:    'Tipeá para buscar Video de Kaltura...',
            value:          this.state.title,
            onChange:       this.handleChange,
            style:          {display:"inline"}
        };

        return (
            <div className="related-content-block" onClick={this.handleClick} style={{position: 'relative'}}>
                <div className="links-related">
                    <span className="title">Video Kaltura: </span>

                    <div className="link-container" style={{display:(this.state.isEditing) ? 'none' : 'block'}}>
                        <a className="link" href={this.state.title} target="_blank">{this.state.title}</a>
                        <icons.KalturaIcon onClick={this.handleEdit}/>
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