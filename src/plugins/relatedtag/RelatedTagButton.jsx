import React, {Component} from "react";
import {insertDataBlock} from "megadraft";
import icons from "../../icons/icons";


export default class RelatedTagButton extends Component {

    constructor(props) {
        super(props);
        this.onClick = ::this.onClick;
    }

    onClick(e) {
        e.preventDefault();
        const data = { type: "relatedtag", dataType: "relatedtag", data: { tag: {name: "", url:"" }}};
        this.props.onChange(insertDataBlock(this.props.editorState, data));
    }

    render() {
        return (
            <div>
                <button title="Agregá notas sobre un tag o personaje" className={this.props.className} type="button" onClick={this.onClick} >
                    <icons.RelatedTagIcon className="sidemenu__button__icon"/>
                </button>
            </div>
        );
    }
}
