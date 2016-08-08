import React from 'react';
import {Entity} from 'draft-js';

export default class VideoBlock extends React.Component {

    render() {
        const {block} = this.props;
        const data = Entity.get(block.getEntityAt(0)).getData();

        return (
            <video width="960" height="549" controls>
                <source src={data.src}/>
                Your browser does not support the video tag.
            </video>
        );
    }
}