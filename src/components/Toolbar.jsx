import React, {Component} from "react";

export const Toolbar = (props) => {

    return (
        <div className="RichEditor-controls">

            {props.plugins.map((plugin) => {

                const Button = plugin.buttonComponent;

                let clickAction = '';
                switch (plugin.type){
                    case 'inline':
                        clickAction = props.onToggleInlineStyle;
                        break;
                    case 'block':
                        clickAction = props.onToggleBlockType;
                        break;
                    case 'atomic':
                        clickAction = props.onInsertBlock;
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
};