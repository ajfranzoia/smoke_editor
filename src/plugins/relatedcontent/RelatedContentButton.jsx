import React, {Component} from "react";
import icons from "../../icons/icons";
import Modal from "../../components/Modal"
import {insertDataBlock} from "megadraft";

export default class RelatedContentButton extends Component {

    constructor(props) {
        super(props);

        this.onClick = ::this.onClick;
    }

    /*openModal = (e) => {
        e.preventDefault()
        this.setState({
            showModal: true
        });
    }
    
    closeModal = (e) => {
        e.preventDefault();
        this.setState({
            showModal: false
        });
    }*/

    onClick(e) {
        e.preventDefault();
        /*const src = window.prompt("Enter a URL");
        if (!src) {
            return;
        }*/

        const data = { type: "relatedcontent",  title: "", href: ""};
        this.props.onChange(insertDataBlock(this.props.editorState, data));
    }


    render() {
        console.log(this.state);

        return (
                <div>
                    <button className={this.props.className} type="button" onClick={this.onClick} >
                        <icons.TwitterIcon className="sidemenu__button__icon"/>
                    </button>
                </div>
        );
    }
}
