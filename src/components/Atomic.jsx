import React from 'react';
import {Entity} from 'draft-js';

export default class Atomic extends React.Component {

    render() {

        const {block} = this.props;
        const plugins = this.props.blockProps.plugins;
        const entity = Entity.get(block.getEntityAt(0));
        const {data} = entity.getData();
        const type = entity.getType();
        var Block = '';
        {plugins.map((plugin) => {
            if(type === plugin.type) {
                Block = plugin.blockComponent;
            }
        })}

        return (
            <Block block={block}/>
        );

    }

}