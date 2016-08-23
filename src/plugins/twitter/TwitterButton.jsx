/*
 * Copyright (c) 2016, Globo.com (https://github.com/globocom)
 *
 * License: MIT
 */

import React, {Component} from "react";

import {MegadraftIcons,insertDataBlock} from "megadraft";



export default class TwitterButton extends Component {

  constructor(props) {
    super(props);
    this.onClick = ::this.onClick;
  }

  onClick(e) {
    e.preventDefault();
    const src = window.prompt("Dale tuiteaaa papá!!");
    if (!src) {
      return;
    }

    const data = {src: src, type: "twitter", display: "small"};

    this.props.onChange(insertDataBlock(this.props.editorState, data));
  }

  render() {
    return (
      <button className={this.props.className} type="button" onClick={this.onClick}>
        <MegadraftIcons.VideoIcon className="sidemenu__button__icon" />
      </button>
    );
  }
}
