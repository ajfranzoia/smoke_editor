import React, {Component} from "react";
import Autosuggest from 'react-autosuggest';

// Imagine you have a list of languages that you'd like to autosuggest.
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
            href: '',
            title: '',
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

        this.setState({
            title: suggestion.title,
            href: suggestion.href,
        });

        return suggestion.title;
    }




    handleChange = (event, { newValue }) => {
        this.setState({
            title: newValue,
        });
    }

    handleLinkClick = (e) => {
        e.preventDefault();
    }

    // Autosuggest will call this function every time you need to update suggestions.
    // You already implemented this logic above, so just use it.
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    // Autosuggest will call this function every time you need to clear suggestions.
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    render() {


        // Autosuggest will pass through all these props to the input field.
        const inputProps = {
            placeholder: 'Tipeá para buscar la nota...',
            value: this.state.title,
            onChange: this.handleChange
        };


        /*if(this.state.title.length != 0){

            var title = this.state.title;
        } else {

            var title =
                <Autosuggest
                    suggestions={this.state.suggestions}
                    onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                    onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                    getSuggestionValue={getSuggestionValue}
                    renderSuggestion={renderSuggestion}
                    inputProps={inputProps} />

        }*/

        return (
            <p className="links-related">
                <span className="title">Leé también</span>:
                <a onClick={this.handleLinkClick} href={this.state.href} target="_blank">
                    <Autosuggest
                        suggestions={this.state.suggestions}
                        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                        getSuggestionValue={this.getSuggestionValue}
                        renderSuggestion={this.renderSuggestion}
                        inputProps={inputProps} />
                    {this.state.title}
                </a>
            </p>
        );
    }
}