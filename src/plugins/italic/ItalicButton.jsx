import React, {Component} from "react";
import {
    Entity,
} from 'draft-js';

const ItalicButton = (props) => {

    const toggleInlineStyle = (e) => {
        e.preventDefault();
        props.onClick(props.plugin.name);
    }

    return (
        <span className="RichEditor-styleButton" onMouseDown={toggleInlineStyle}>Italic</span>
    );

};

export default ItalicButton;