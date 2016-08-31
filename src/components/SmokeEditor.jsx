import {MegadraftEditor} from "megadraft";


export default class SmokeEditor extends MegadraftEditor {
    constructor(props) {
        super(props);
    }

    blockStyleFn = (contentBlock) => {
        const blockType = contentBlock.getType();
        let style = null;
        this.props.actions.forEach(function (action) {
            if(blockType == action.style){
                style =  action.className;
            }
        });
        return style;
    }
}