import React from 'react';
import {
    DraftJS,
    MegadraftEditor,
    editorStateFromRaw,
    editorStateToJSON,
    createTypeStrategy
} from "megadraft";
import Immutable from "immutable";

const {Map} = Immutable;
const {DefaultDraftBlockRenderMap} = DraftJS;

export default class Smoke extends React.Component {
    constructor(props) {
        super(props);

        this.decorator = this.getDecorator();

        if (props.defaultValue.length > 0) {
            const contentState = JSON.parse(props.defaultValue);
            var editorState = editorStateFromRaw(contentState, this.decorator);
        } else {
            var editorState = editorStateFromRaw(null, this.decorator);
        }

        this.state = {
            editorState: editorState,
            smokeJson: editorStateToJSON(editorState),
            name: this.props.name,
            id: this.props.id,
        };

        this.entityInputs = this.getEntityInputs();

    }
    
    getEntityInputs = () => {
        const entityInputs = {};
        this.props.actions.forEach(function (action) {
            if(action.entity && action.entityInput) {
                entityInputs[action.entity] = action.entityInput;
            }
        });

        return entityInputs;
    }

    getDecorator = () => {
        let decorators = [];
        this.props.actions.forEach(function (action) {
            if(action.entity && action.component) {
                decorators.push({
                    strategy: createTypeStrategy(action.entity),
                    component: action.component,
                })
            }
        });
        return new DraftJS.CompositeDecorator(decorators);
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
                    entityInputs={this.entityInputs}
                    />
                <input type={inputType} readOnly name={this.state.name} id={this.state.id} value={this.state.smokeJson}/>
            </div>
        )
    }
}