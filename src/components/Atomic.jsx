import React from 'react';
import {Entity} from 'draft-js';
import KalturaComponent from './KalturaComponent.jsx';
import EmbedComponent from './EmbedComponent.jsx';
import VideoComponent from './VideoComponent.jsx';
import AudioComponent from './AudioComponent.jsx';

export default class Atomic extends React.Component {


    render() {

        const {block} = this.props;
        const entity = Entity.get(block.getEntityAt(0));
        const {data} = entity.getData();
        const type = entity.getType();

        switch (type){
            case 'KALTURA':
                return (
                    <KalturaComponent block={block} />
                );
                break;
            case 'EMBED':
                return (
                    <EmbedComponent block={block} />
                );
            case 'VIDEO':
                return (
                    <VideoComponent block={block} />
                );
                break;
            case 'AUDIO':
                return (
                    <AudioComponent block={block} />
                );
                break;
            default:
                return '';
                break;
        }
    }
}