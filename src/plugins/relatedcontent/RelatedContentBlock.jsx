import React, {Component} from "react";
import Autosuggest from 'react-autosuggest';

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


export default class RelisEditingatedContentBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: true,
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
            isEditing: false
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
    handleEdit = (e) => {
        e.preventDefault();
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

    render() {

        const inputProps = {
            placeholder: 'Tipeá para buscar la nota...',
            value: this.state.title,
            onChange: this.handleChange
        };

        if(this.state.isEditing == true){
            var autosuggest = <Autosuggest
                suggestions={this.state.suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps} />;
        } else {
            var autosuggest = <a onClick={this.handleEdit}>Editar</a>;
        }

        return (
            <div>
                <p className="links-related">
                    <span className="title">Leé también</span>:
                    <a onClick={this.handleLinkClick} href={this.state.href} target="_blank">
                        {this.state.title}
                    </a>
                </p>
                {autosuggest}
            </div>
        );
    }
}