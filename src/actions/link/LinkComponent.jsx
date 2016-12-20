import {DraftJS} from "megadraft";
import React, {Component} from "react";


export default class Link extends Component {
    render() {
        const {url} = DraftJS.Entity.get(this.props.entityKey).getData();
        return (
            <a className="editor__link" href={url} title={url}>
                {this.props.children}
            </a>
        );
    }
}
