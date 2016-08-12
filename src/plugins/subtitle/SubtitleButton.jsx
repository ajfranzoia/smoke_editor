import React, {Component} from "react";
import {
    Entity,
} from 'draft-js';

const SubtitleButton = (props) => {

    const toggleBlockType = (e) => {
        e.preventDefault();
        props.onClick(props.plugin.style);
    }

    return (
        <span className="RichEditor-styleButton" onMouseDown={toggleBlockType}>Subtitle</span>
    );

};

export default SubtitleButton;