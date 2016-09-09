import React, {Component} from "react";
import icons from "../../icons/icons";
import Modal from "../../components/Modal"
import {insertDataBlock} from "megadraft";
import {Modifier, EditorState} from "draft-js";
import Immutable from "immutable";
const {Map} = Immutable;

export default class RelatedContentButton extends Component {

    constructor(props) {
        super(props);

        this.onClick = ::this.onClick;
    }

    onClick(e) {
        e.preventDefault();
        const data = { type: "relatedcontent", data: { title: "", href: ""}};
        this.props.onChange(insertDataBlock(this.props.editorState, data)); 

    }


    render() {

        return (
                <div>
                    <button className={this.props.className} type="button" onClick={this.onClick} >
                        <icons.TwitterIcon className="sidemenu__button__icon"/>
                    </button>
                </div>
        );
    }
}
