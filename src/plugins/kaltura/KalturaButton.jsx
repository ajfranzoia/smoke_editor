import React, {Component} from "react";
import {
    Entity,
} from 'draft-js';

const KalturaButton = (props) => {

    var insertKalturaBlock = props.onInsert.bind(this, function(){
        const entryId = window.prompt('Enter a Kaltura ID');

        if (!entryId) {
            return;
        }

        return Entity.create(
            'KALTURA',
            'IMMUTABLE',
            {
                entryId: entryId
            }
        );
    });

    return (
        <span className="RichEditor-styleButton" onMouseDown={insertKalturaBlock}>Kaltura</span>
    );

};

export default KalturaButton;