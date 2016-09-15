import React, {Component} from "react";
import {MegadraftPlugin, MegadraftIcons as icons} from "megadraft";

export default class EmbedBlock extends Component {
    constructor(props) {
        super(props);
        console.log('props --> ',props);
        this.actions = [
            //{"key": "edit", "icon": icons.EditIcon, "action": this._handleEdit},
            {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
        ];
    }


    _handleCaptionChange = (event) => {
        this.props.container.updateData({caption: event.target.value});
    }

    render() {
        return (
            <MegadraftPlugin.CommonBlock {...this.props} actions={this.actions}>
                <div className={"smoke-block smoke-" + this.props.data.dataType} />
            </MegadraftPlugin.CommonBlock>
        );
    }
}