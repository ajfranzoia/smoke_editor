import React, {Component} from "react";
import Autosuggest from 'react-autosuggest';
import {MegadraftIcons as icons} from "megadraft";
import {Modifier, EditorState, convertToRaw, RichUtils, SelectionState} from "draft-js";
import Immutable from "immutable";
const {Map} = Immutable;

// @todo: remove when implemented ajax to get the suggested contents
const contents = [
    {
        href: 'http://tn.com.ar/politica/piden-imputar-por-lavado-al-sindicalista-omar-caballo-suarez_710932',
        title: 'Imputaron por lavado de dinero al sindicalista Omar "Caballo" Suárez'
    },
    {
        href: 'http://tn.com.ar/politica/imputaron-a-sergio',
        title: 'Imputaron a sergio'
    },
    {
        href: 'http://tn.com.ar/deportes/esencial/un-jugador-de-la-nba-abandona-su-carrera-para-cuidar-su-esposa-embarazada-que-tiene-cancer_710865',
        title: 'Un jugador de la NBA abandona su carrera para cuidar a su esposa embarazada que tiene cáncer'
    }
];


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
        const inputLength = inputValue.length;

        // @todo: ajax to get contents

        return inputLength === 0 ? [] : contents.filter(content =>
            content.title.toLowerCase().slice(0, inputLength) === inputValue
        );
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
        this.setState({
            suggestions: this.getSuggestions(value)
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
            isEditing: false
        });


    };

    render() {

        const inputProps = {
            placeholder: 'Tipeá para buscar la nota...',
            value: this.state.title,
            onChange: this.handleChange,
            style: (this.state.isEditing) ? {display:"block"} : {display:"none"}
        };


        const iconStyles = {
            display: (this.state.isEditing) ? "none" : "inline",
        }

        return (
            <div onClick={this.handleClick} style={{position: 'relative'}}>
                <p className="links-related">
                    <span className="title">Leé también</span>:
                    <a href={this.state.href} target="_blank">
                        {this.state.title}
                    </a>
                    <icons.EditIcon onClick={this.handleEdit} style={iconStyles}/>
                </p>
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
        );
    }
}