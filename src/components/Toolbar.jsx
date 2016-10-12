import React, {Component} from "react";
import {Toolbar} from "megadraft";
import ToolbarItem from "./ToolbarItem";
import {Modifier, EditorState, Entity} from 'draft-js';

export default class SmokeToolbar extends Toolbar {

    hasLink() {
        const selection = this.props.editorState.getSelection();
        const anchorKey = selection.getAnchorKey();
        const contentState = this.props.editorState.getCurrentContent();
        const anchorBlock = contentState.getBlockForKey(anchorKey);
        const entityKey = anchorBlock.getEntityAt(selection.anchorOffset);
        if (entityKey) {
            const entity = Entity.get(entityKey);
            const {type} = entity.getData();
            // this method is overriden so it would not set as active the "link" button when a diferent "entity" action should be active instead.
            if (entity.getType() === "LINK" && typeof type == 'undefined') {
                return true;
            }
        }
        return false;
    }
    renderButton(item, position) {
        let current = null;
        let toggle = null;
        let active = null;
        let key = item.label;

        switch(item.type) {
            case "inline": {
                current = this.props.editorState.getCurrentInlineStyle();
                toggle = () => this.toggleInlineStyle(item.style);
                active = current.has(item.style);
                break;
            }
            case "block": {
                const selection = this.props.editorState.getSelection();
                current = this.props.editorState
                    .getCurrentContent()
                    .getBlockForKey(selection.getStartKey())
                    .getType();
                toggle = () => this.toggleBlockStyle(item.style);
                active = item.style === current;
                break;
            }
            case "separator": {
                key = "sep-" + position;
                break;
            }
            case "entity": {

                // leave "link" as megadraft intended it
                // add a default that treats all new actions with an "action" property (See "People" or "Tag" for reference)
                switch(item.style){
                    case 'link':
                        toggle = () => this.toggleLink();
                        active = this.hasLink();
                        break;
                    default:
                        const action = new item.action(this.props.editorState, this.props.onChange);
                        toggle = () => action.onToggle();
                        active = action.has();
                        break;
                }

                break;
            }
        }

        return (
            <ToolbarItem key={key} active={active} toggle={toggle} item={item} />
        );
    }


}

