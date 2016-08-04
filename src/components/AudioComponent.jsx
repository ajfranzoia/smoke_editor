import React from 'react';
import {Entity} from 'draft-js';

export default class AudioComponent extends React.Component {
    
    render() {
        const {block} = this.props;
        const data = Entity.get(block.getEntityAt(0)).getData();

        return (
            <audio controls autoPlay>
                <source src={data.src} />
                    Your browser does not support the audio tag.
            </audio>
        );
    }
}