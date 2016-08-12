import React, {Component} from "react";
import {
    Entity,
} from 'draft-js';

const HeaderOneButton = (props) => {

    const toggleBlockType = (e) => {
        console.log(props);
        e.preventDefault();
        props.onClick(props.plugin.style);
    }

    return (
        <span className="RichEditor-styleButton" onMouseDown={toggleBlockType}>H1</span>
    );

};

export default HeaderOneButton;