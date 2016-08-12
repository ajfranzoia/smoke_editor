import React, {Component} from "react";



export default class Toolbar extends React.Component {

    constructor(props) {
        super(props);
    }
    
    render() {
        return (

            <div className="RichEditor-controls">

                {this.props.plugins.map((plugin) => {

                    const Button = plugin.buttonComponent;

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
                            key={plugin.name}
                            plugin={plugin}
                            onClick={clickAction}
                        />
                    );
                })}
            </div>
        );

    }
}
