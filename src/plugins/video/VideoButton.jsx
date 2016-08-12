import React, {Component} from "react";
import {
    Entity,
} from 'draft-js';

const VideoButton = (props) => {

    var insertVideoBlock = props.onClick.bind(this, function(){
        const src = window.prompt('Enter a video url');
        if (!src) {
            return;
        }
        return Entity.create(
            'VIDEO',
            'IMMUTABLE',
            {
                src: src
            }
        );
    });

    return (
        <span className="RichEditor-styleButton" onMouseDown={insertVideoBlock}>Video</span>
    );

};

export default VideoButton;