import React, {Component} from "react";
import icons from "../../icons/icons";
import {insertDataBlock} from "megadraft";
import {Modifier, EditorState} from "draft-js";

import Modal from './RelatedUserArticleModal';

export default class RelatedUserArticleButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }
    };

    openModal = (e) => {
        e.preventDefault();
        this.setState({
            showModal: true
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false
        });
    };

    render() {
        return (
            <div>
                <button title="Insertá la imagen/video de una nota de TN y la Gente" className={this.props.className} type="button" onClick={this.openModal}>
                    <icons.RelatedUserArticleIcon className="sidemenu__button__icon"/>
                </button>
                <Modal isShowingModal={this.state.showModal}
                       editorState={this.props.editorState}
                       onChange={this.props.onChange}
                       closeModal={this.closeModal} />
            </div>
        );
    }

}
