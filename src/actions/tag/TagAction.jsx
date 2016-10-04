import React, {Component} from "react";
import {Modifier, EditorState, Entity} from 'draft-js';

export default class TagAction  {

    constructor(editorState, onChange) {
        this.editorState = editorState;
        this.onChange = onChange;
    }

    onToggle = () => {
        if (this.has()) {
            this.remove();
        } else {
            this.set();
        }
    }

    has = () => {
        const selection = this.editorState.getSelection();
        const anchorKey = selection.getAnchorKey();
        const contentState = this.editorState.getCurrentContent();
        const anchorBlock = contentState.getBlockForKey(anchorKey);
        const entityKey = anchorBlock.getEntityAt(selection.anchorOffset);
        if (entityKey) {
            const entity = Entity.get(entityKey);
            const {type} = entity.getData();
            if (entity.getType() === "LINK" && type == 'tag') {
                return true;
            }
        }
        return false;
    }

    set = () => {

        const editorState = this.editorState;

        const selection = editorState.getSelection();
        const contentBlock = editorState.getCurrentContent().getBlockForKey(selection.getStartKey());
        const tag = contentBlock.getText().slice(selection.getStartOffset(), selection.getEndOffset()).trim().replace(/\s+/g, '-').toLowerCase();
        if(tag.length > 0) {
            const entityKey = Entity.create("LINK", "MUTABLE", {"type": "tag", url: 'http://tn.com.ar/tags/' + tag});

            let newContentState = Modifier.applyEntity(
                editorState.getCurrentContent(),
                selection,
                entityKey
            );

            let EntityAppliedState = EditorState.push(
                editorState,
                newContentState,
                'apply-entity'
            )

            let newState = EditorState.forceSelection(
                EntityAppliedState, selection);
            this.onChange(newState);
        }

    }
    remove = () => {
        const editorState = this.editorState;
        const selection = editorState.getSelection();
        if (!selection.isCollapsed()) {

            let newContentState = Modifier.applyEntity(
                    editorState.getCurrentContent(),
                    selection,
                    null
                )

            let EntityAppliedState = EditorState.push(
                editorState,
                newContentState,
                'apply-entity'
            )

            this.onChange(EntityAppliedState);
        }
    }
}