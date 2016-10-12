import React, {Component} from "react";
import {MegadraftIcons as icons} from "megadraft";
import Modal from "./ImageModal"


export default class ImageButton extends Component {
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

    closeModal = (e) => {
        e.preventDefault();
        this.setState({
            showModal: false
        });
    };

    render() {
        return (
            <div>
                <button className={this.props.className} type="button" onClick={this.openModal}>
                    <icons.ImageIcon className="sidemenu__button__icon"/>
                </button>
                <Modal isShowingModal={this.state.showModal} editorState={this.props.editorState}
                       onChange={this.props.onChange} closeModal={this.closeModal}/>
            </div>
        );
    }
}
