import React from 'react';
import {Entity} from 'draft-js';
import KalturaFactory from '../modules/Kaltura/js/kaltura-factory.jsx';

export default class KalturaComponent extends React.Component {


    componentDidMount = () => {
        //KalturaFactory.makeKaltura();
    }

    render() {
        const {block} = this.props;
        const data = Entity.get(block.getEntityAt(0)).getData();

        return (

            <div className="kaltura_player"
                data-uiconfig="23448616"
                 data-pid="107"
                 data-entryid={data.entryId}
                 data-embedtype="thumbnail"
                 data-wid="10700"
                 data-publisher="56fbd64476311"
                 data-sp="10700"
                 id={'kaltura_player_'+ Math.random().toString(36).substring(7)}>
                Soy un kaltura: {data.entryId}
            </div>


        );
    }
}