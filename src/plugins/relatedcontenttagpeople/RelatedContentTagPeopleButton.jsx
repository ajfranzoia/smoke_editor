import React, {Component}       from "react";
import {Modifier, EditorState}  from "draft-js";
import {insertDataBlock}        from "megadraft";
import icons                    from "../../icons/icons";

export default class RelatedContentTagPeopleButton extends Component {

    constructor(props) {
        super(props);
        this.onClick = ::this.onClick;
    }

    onClick(e) {
        e.preventDefault();
        const data = { type: "relatedcontenttagpeople", dataType:"relatedcontenttagpeople", data: { tid: "", name: ""}};
        this.props.onChange(insertDataBlock(this.props.editorState, data));
    }

    render() {
        return (
            <div>
                <button className={this.props.className} type="button" onClick={this.onClick} >
                    <icons.RelatedContentTagPeopleIcon className="sidemenu__button__icon"/>
                </button>
            </div>
        );
    }
}
