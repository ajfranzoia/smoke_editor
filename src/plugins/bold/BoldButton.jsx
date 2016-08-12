import React, {Component} from "react";
import {
    Entity,
} from 'draft-js';

const BoldButton = (props) => {

    const toggleInlineStyle = (e) => {
        e.preventDefault();
        props.onClick(props.plugin.name);
    }

    return (
        <span className="RichEditor-styleButton" onMouseDown={toggleInlineStyle}>Bold</span>
    );

};

export default BoldButton;