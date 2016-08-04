import React from 'react';
import {Entity} from 'draft-js';

export default class EmbedComponent extends React.Component {

    
    render() {
        const {block} = this.props;
        const data = Entity.get(block.getEntityAt(0)).getData();

        return (

            <div>
                Soy un embed: {data.embedCode}
            </div>

        );
    }
}