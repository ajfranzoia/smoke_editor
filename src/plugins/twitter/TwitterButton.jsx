/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import {insertDataBlock} from "megadraft";
import icons from "../../icons/icons";
import Modal from '../../components/Modal';


export default class TwitterButton extends Component {

    constructor(props) {
        super(props);
        this.onClick = ::this.onClick;

        console.log('this.props.editorState --> ', this.props.editorState)
    }

    onClick(e) {
        e.preventDefault();
        const src = window.prompt("Enter a URL");
        if (!src) {
            return;
        }

        const data = {src: src, type: "twitter", display: "small"};

        this.props.onChange(insertDataBlock(this.props.editorState, data));
    }

    render() {
        return (
            <button className={this.props.className} type="button" onClick={this.onClick}>
                <icons.TwitterIcon className="sidemenu__button__icon"/>
            </button>
        );
    }
}
