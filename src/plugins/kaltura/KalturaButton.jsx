import React, {Component}       from "react";
import {insertDataBlock}        from "megadraft";
import icons                    from "../../icons/icons";

export default class KalturaButton extends Component {

    constructor(props) {
        super(props);
        this.onClick = ::this.onClick;
    }

    onClick(e) {
        e.preventDefault();
        const data = { type: "kaltura", dataType: "kaltura", data: { video: {nid: "", name: "" }}};
        this.props.onChange(insertDataBlock(this.props.editorState, data));
    }

    render() {
        return (
            <div>
                <button title="Agregá un video al cuerpo de la nota" className={this.props.className} type="button" onClick={this.onClick} >
                    <icons.KalturaIcon className="sidemenu__button__icon"/>
                </button>
            </div>
        );
    }
}
