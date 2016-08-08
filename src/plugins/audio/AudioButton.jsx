import React, {Component} from "react";
import {
    Entity,
} from 'draft-js';

const AudioButton = (props) => {
    
    var insertAudioBlock = props.onInsert.bind(this, function(){
        const src = window.prompt('Enter an audio url');
        if (!src) {
            return;
        }
        return Entity.create(
            'AUDIO',
            'IMMUTABLE',
            {
                src: src
            }
        );
    });

    return (
        <span className="RichEditor-styleButton" onMouseDown={insertAudioBlock}>Audio</span>
    );

};

export default AudioButton;