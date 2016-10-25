import React, {Component} from "react";
import icons from "../../icons/icons";
import Modal from "./EmbedModal"

export default class EmbedButton extends Component {

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
                <button title="Agregá un embed externo" className={this.props.className} type="button" onClick={this.openModal}>
                    <icons.CodeIcon className="sidemenu__button__icon"/>
                </button>
                <Modal isShowingModal={this.state.showModal} editorState={this.props.editorState}
                       onChange={this.props.onChange} closeModal={this.closeModal}/>
            </div>
        );
    }
}
