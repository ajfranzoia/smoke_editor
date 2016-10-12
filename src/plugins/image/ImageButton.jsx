/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import {MegadraftIcons as icons} from "megadraft";
import {insertDataBlock} from "megadraft";


export default class ImageButton extends Component {
    constructor(props) {
        super(props);
        this.onClick = ::this.onClick;
    }


    onClick(e) {
        e.preventDefault();
        const src = window.prompt("Enter a URL");
        if (!src) {
            return;
        }

        const data = {src: src, type: "image", display: "medium"};

        this.props.onChange(insertDataBlock(this.props.editorState, data));
    }

    render() {
        return (
            <button className={this.props.className} type="button" onClick={this.onClick}>
                <icons.ImageIcon className="sidemenu__button__icon"/>
            </button>
        );
    }
}
