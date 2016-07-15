import React, {Component} from "react";
import {Entity} from 'draft-js';
export class SubtitleComponent extends React.Component {
    render() {
        const {block} = this.props;
        const {foo} = this.props.blockProps;
        const data = Entity.get(block.getEntityAt(0)).getData();
        // Return a <figure> or some other content using this data.
        return (
          <h5 class="subtitle">Soy un subtitulo</h5>
        );
    }
}