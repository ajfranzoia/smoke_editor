import React, {Component} from "react";
import StyleButton from './StyleButton';



export default class Toolbar extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (

            <div className="RichEditor-controls">

                {this.props.plugins.map((plugin) => {

                    const Button = (typeof plugin.buttonComponent != 'undefined') ? plugin.buttonComponent : StyleButton;

                    let clickAction = '';
                    switch (plugin.type){
                        case 'inline':
                            clickAction = this.props.onToggleInlineStyle;
                            break;
                        case 'block':
                            clickAction = this.props.onToggleBlockType;
                            break;
                        case 'atomic':
                            clickAction = this.props.onInsertCustomBlock;
                            break;
                    }


                    return (
                        <Button
                            key={plugin.style}
                            plugin={plugin}
                            onClick={clickAction}
                        />
                    );
                })}
            </div>
        );

    }
}
