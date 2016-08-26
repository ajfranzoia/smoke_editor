/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";
import DOMParser from "parse-html";

import {
    MegadraftPlugin
} from "megadraft";


import {MegadraftIcons as icons} from "megadraft";

import VideoBlockStyle from "./VideoBlockStyle";


export default class VideoBlock extends Component {
    constructor(props) {
        super(props);

        console.log("MegadraftIcons --> ",icons)

        this._handleCaptionChange = ::this._handleCaptionChange;

        this.actions = [
            {"key": "edit", "icon": icons.EditIcon, "action": this._handleEdit},
            {"key": "delete", "icon": icons.DeleteIcon, "action": this.props.container.remove}
        ];
    }

    _handleEdit() {
    }

    _handleCaptionChange(event) {
        this.props.container.updateData({caption: event.target.value});
    }

    render() {
        return (
            <MegadraftPlugin.CommonBlock {...this.props} actions={this.actions}>
                <blockquote className="twitter-tweet" data-lang="es"><p lang="es" dir="ltr">¿Encuentros furtivos? Las fotos de la polémica: <a href="https://twitter.com/balfederico">@balfederico</a> y <a href="https://twitter.com/laufer4">@laufer4</a> en Córdoba <a href="https://t.co/YDsTLcaPo0">https://t.co/YDsTLcaPo0</a> <a href="https://t.co/XJ6lhYtutb">pic.twitter.com/XJ6lhYtutb</a></p>&mdash; ElDoce (@ElDoce) <a href="https://twitter.com/ElDoce/status/769277364790562816">26 de agosto de 2016</a></blockquote>
                <script async src="//platform.twitter.com/widgets.js" charSet="utf-8"></script>
            </MegadraftPlugin.CommonBlock>
        );
    }
}