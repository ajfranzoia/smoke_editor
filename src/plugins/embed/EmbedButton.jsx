import React, {Component} from "react";
import {
    Entity,
} from 'draft-js';

const EmbedButton = (props) => {

    var insertBlock = props.onInsert.bind(this, function(){
        const embedCode = window.prompt('Paste the embed code');
        if (!embedCode) {
            return;
        }
        return Entity.create(
            'EMBED',
            'IMMUTABLE',
            {
                embedCode: embedCode
            }
        );
    });

    return (
        <span className="RichEditor-styleButton" onMouseDown={insertBlock}>Embed</span>
    );

};

export default EmbedButton;