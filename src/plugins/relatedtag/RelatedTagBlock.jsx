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

export default class RelatedTagBlock extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: (this.props.data.data.name) ? false : true,
            name: (this.props.data.data.name || ''),
            url: (this.props.data.data.url || ''),
            data: (this.props.data.data || {tag: {name:'', url:''}}),
            loading: false,
            suggestions: []
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

    getCurrentNodeId = () => {

        let url = document.URL;
        let regex = "^.*/node/(\\d*)/edit.*";
        let nid_array = url.match(regex);

        let nid = nid_array != null ? nid_array[1] : "";

        return nid;
    };

    getLatestArticlesPromise = (tid, nid) => {

        this.setState({
            loading: true,
        });

        let Url = config.latestThreeArticlesByTid + tid + '/' + nid;

        return axios.get(Url);
    }

    onSuggestionSelected = (event, { suggestion, suggestionValue, sectionIndex, method }) => {
        const editorState = this.props.blockProps.editorState;
        const contentState = editorState.getCurrentContent();

        let nid = this.getCurrentNodeId();

        let latestArticlesPromise = this.getLatestArticlesPromise(suggestion.tid, nid);

        latestArticlesPromise
            .then(function (response) {

                let data = {tag: {name: suggestion.tag, url: suggestion.tagUrl}, articles: response.data};

                this.setState({
                    data: data,
                    isEditing: false,
                    loading: false
                });

                const newData = {type: 'relatedtag', dataType: 'relatedtag', data};
                const targetSelection = SelectionState.createEmpty(this.props.container.props.block.get('key'));
                const newContentState = Modifier.mergeBlockData(contentState, targetSelection, Map(newData));

                this.props.blockProps.onChange(EditorState.push(
                    editorState,
                    newContentState,
                    'change-block-data'
                ));

            }.bind(this))
            .catch(function (error) {
                console.log(error);
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
            placeholder: 'Tipeá para buscar Tags o Personajes...',
            value: this.state.name,
            onChange: this.handleChange,
            style: {display:"inline"}
        };

        let articles = '';

        if (typeof this.state.data.articles !== 'undefined')
            {
            articles = <div className="related-tag-articles grid-spaceAround">
                            <div className="col-11 grid">
                                {this.state.data.articles.map(function(article)
                                    {
                                    return  <article key={article.url} className="col-4">
                                                <h3><a href={article.url}>{article.title}</a></h3>
                                            </article>
                                    }
                                )}
                            </div>
                        </div>
            }

        if(this.state.loading) {
            articles = 'cargando...';
        }

        return (
            <div className="related-content-block" onClick={this.handleClick} style={{position: 'relative'}}>
                <div className="links-related">

                    <span>Más sobre:</span>

                    <div className="related-tag-tag link-container" style={{display:(this.state.isEditing) ? 'none' : 'block'}}>
                        <a className="link" href={this.state.data.tag.url} target="_blank">{this.state.data.tag.name}</a>
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

                    <div className="related-tag-articles grid-spaceAround">
                        <div className="col-11 grid">
                            {articles}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}