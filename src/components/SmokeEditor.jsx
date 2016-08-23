import {MegadraftEditor} from "megadraft";
import  MegadraftPlugin from "../plugins/default";

export default class SmokeEditor extends MegadraftEditor {
    constructor(props) {
        super(props);
        console.log('this.plugins --> ',this.plugins);
        this.plugins = MegadraftPlugin;
        console.log('this.plugins alterado --> ',this.plugins);


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