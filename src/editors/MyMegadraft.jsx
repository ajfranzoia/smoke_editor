import React, {Component} from "react";
import {
    EditorState,
    convertFromRaw,
    convertToRaw
} from 'draft-js';
import Megadraft from "megadraft";

import {stateFromHTML} from 'draft-js-import-html';
import {stateToHTML} from 'draft-js-export-html';


class MyMegadraft extends React.Component {
    constructor(props) {
        super(props);


        this.state = {
            editorState: this.props.editorState
        };
        //this.onChange = ::this.onChange;
        this.onChange = (editorState) => {
            this.setState({editorState});
            this.updateContent(editorState);
        }
    }

    onChange(editorState) {
        this.setState({editorState});
    }


    updateContent(editorState) {
        this.props.updateContent(editorState);
    }

    render() {
        return (
            <Megadraft
                editorState={this.state.editorState}
                onChange={this.onChange}/>
        )
    }
}

export default MyMegadraft;