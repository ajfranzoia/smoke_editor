import React from 'react';
import {EditorState, ContentState} from 'draft-js';
import {DraftJS, MegadraftEditor, editorStateFromRaw, editorStateToJSON, createTypeStrategy} from "megadraft";
import {DefaultDraftBlockRenderMap, Editor} from 'draft-js';
import Immutable from "immutable";
const {Map} = Immutable;
import actions from "../actions/Actions";

import LinkInput from "megadraft/lib/entity_inputs/LinkInput";
import LinkComponent from "../actions/link/LinkComponent";
import TagLinkInput from "../actions/tag/TagLinkInput";
import TagLinkComponent from "../actions/tag/TagLinkComponent";
import PeopleLinkInput from "../actions/people/PeopleLinkInput";
import PeopleLinkComponent from "../actions/people/PeopleLinkComponent";

const entityInputs = {
    LINK: LinkInput,
    TAG_LINK: TagLinkInput,
    PEOPLE_LINK: PeopleLinkInput
}

const myDecorator = new DraftJS.CompositeDecorator([
    {
        strategy: createTypeStrategy("TAG_LINK"),
        component: TagLinkComponent,
    },
    {
        strategy: createTypeStrategy("PEOPLE_LINK"),
        component: PeopleLinkComponent,
    },
    {
        strategy: createTypeStrategy("LINK"),
        component: LinkComponent,
    }
])


export default class Smoke extends React.Component {
    constructor(props) {
        super(props);

        if (props.defaultValue.length > 0) {
            const contentState = JSON.parse(props.defaultValue);
            var editorState = editorStateFromRaw(contentState, myDecorator);
        } else {
            var editorState = editorStateFromRaw(null, myDecorator);
        }

        this.state = {
            editorState: editorState,
            smokeJson: editorStateToJSON(editorState),
            name: this.props.name,
            id: this.props.id,
        };
    }

    onChange = (editorState) => {

        this.setState({
            editorState: editorState,
            smokeJson: editorStateToJSON(editorState),
        });
    };

    blockRenderMap = () => {

        const customBlockRendering = Map({
            'paragraph': {
                element: 'p',
            },
            'unstyled': {
                element: 'p',
            }
        });
        return DefaultDraftBlockRenderMap.merge(customBlockRendering);
    }


    render() {

        const inputType = (this.props.debug === true) ? 'text' : 'hidden';
        return (
            <div>
                <MegadraftEditor
                    editorState={this.state.editorState}
                    actions={this.props.actions}
                    plugins={this.props.plugins}
                    onChange={this.onChange}
                    blockRenderMap={this.blockRenderMap()}
                    entityInputs={entityInputs}
                    />
                <input type={inputType} readOnly name={this.state.name} id={this.state.id} value={this.state.smokeJson}/>
            </div>
        )
    }
}