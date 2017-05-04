import React, { PropTypes } from 'react';
import { insertDataBlock} from 'megadraft';
import { ModalDialog, ModalContainer } from 'react-modal-dialog';
import axios from 'axios';
import config from './config';

const ERR_ARTICLE_HAS_NO_MEDIA = 'La nota seleccionada no posee imagen/video';
const LABEL_BTN_STATUS_FETCHING = 'Procesando...';
const LABEL_BTN_STATUS_IDLE = 'Insertar';

const initialState = {
    isFocused: false,
    enableFetch: false,
    errorMessage: null
};

function extractArticleIdFromInput(value) {
    const matches = value.match(/(\d+)$/);

    if (!matches) {
        return false;
    }

    return matches[0];
}

export default class RelatedUserArticleModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isShowingModal: this.props.isShowingModal,
            ...initialState
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            isShowingModal: nextProps.isShowingModal
        });
    }

    componentDidUpdate() {
        if (this.state.isShowingModal && this.state.isFocused == false) {
            this.setFocus();
        }
    }

    /**
     * Fetches user article from Drupal service endpoint and updates fetching state.
     * If article is received, saveData() is called.
     * If an error is raised, state.errorMessage is updated with the given error.
     */
    getUserArticle = () => {
        const articleId = extractArticleIdFromInput(this.input.value);
        const url = `${config.articleUrl}${articleId}`;

        this.setState({ isFetching: true });

        axios.get(url)
            .then(response => {
                const article = response.data;

                if (this.isArticleValid(article)) {
                    setTimeout(() => this.saveData(article), 0);
                }
            })
            .catch(response => {
                this.setState({
                    enableFetch: true,
                    errorMessage: response.data
                });
            })
            .then(() => {
                this.setState({ isFetching: false });
            });
    };

    saveData = article => {
        this.addData(article);
        this.handleClose();
    };

    /**
     * Inserts the draft block into the editor.
     */
    addData = (article) => {
        const data = {
            type: 'relateduserarticle',
            dataType: 'relateduserarticle',
            article: {
                nid: article.nid,
                image: article.image,
                kaltura_id: article.kaltura_id
            }
        };

        this.props.onChange(insertDataBlock(this.props.editorState, data));
    };

    isArticleValid = (article) => {
        if (!article.image && !article.kaltura_id) {
            this.setState({
                errorMessage: ERR_ARTICLE_HAS_NO_MEDIA
            });

            return false;
        }

        return true;
    };

    validateInput = () => {
        const isValid = extractArticleIdFromInput(this.input.value);

        this.setState({
            enableFetch: isValid
        });
    };

    setFocus = () => {
        this.input.focus();
        this.input.select();
        this.setState({ isFocused: true });
    };

    handleClose = () => {
        this.setState({
            ...initialState,
            isShowingModal: false
        });

        this.props.closeModal();

        this.setState({ isFocused: false });
    };

    handleChange = (e) => {
        this.setState({
            errorMessage: null
        });
        this.validateInput();
    };

    handleBlur = (e) => {
        this.setState({ isFocused: true });
    };

    render() {
        return (
            <div className="modal-wrapper">
            {
                this.state.isShowingModal &&
                <ModalContainer onClose={this.handleClose}>
                    <ModalDialog className="modal-dialog modal-dialog-plugin-relateduserarticle" width="400" onClose={this.handleClose}>
                        <p className="modal-dialog-header">
                            Inserte URL o ID de la nota de TN y la Gente
                        </p>

                        {
                            this.state.errorMessage &&
                            <div className="alert alert-danger">
                                <i className="glyphicon glyphicon-exclamation-sign"></i> Error: {this.state.errorMessage}
                            </div>
                        }

                        <div className="form-inline">
                            <input onChange={this.handleChange}
                                   disabled={this.state.isFetching}
                                   onBlur={this.handleBlur}
                                   className="form-control"
                                   ref={(ref) => this.input = ref} />
                            &nbsp;
                            <button onClick={this.getUserArticle}
                                    disabled={!this.state.enableFetch || this.state.isFetching}
                                    className="btn btn-primary">
                                <i className="glyphicon glyphicon-ok"></i> { this.state.isFetching ? LABEL_BTN_STATUS_FETCHING : LABEL_BTN_STATUS_IDLE }
                            </button>
                        </div>
                    </ModalDialog>
                </ModalContainer>
            }
            </div>
        );
    }
}