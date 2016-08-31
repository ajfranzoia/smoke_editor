import React, {Component} from "react";
import icons from "../../icons/icons";
import Modal from "../../components/Modal"

export default class TwitterButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        }

    }

    openModal = (e) => {
        e.preventDefault()
        this.setState({
            showModal: true
        });
    }
    
    closeModal = (e) => {
        e.preventDefault()
        this.setState({
            showModal: false
        });
    }

    render() {
        console.log(this.state);

        return (
                <div>
                    <button className={this.props.className} type="button" onClick={this.openModal} >
                        <icons.TwitterIcon className="sidemenu__button__icon"/>
                    </button>
                    <Modal isShowingModal={this.state.showModal} editorState={this.props.editorState} onChange={this.props.onChange} closeModal={this.closeModal} />
                </div>
        );
    }
}
