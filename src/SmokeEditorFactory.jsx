import React from 'react'
import ReactDOM from 'react-dom'
import SmokeEditor from './SmokeEditor.jsx'
import PluginManager from "./plugins/pluginManager.jsx";
//import DOMValidator from "../../dist/Helpers/js/domValidator";

export default class SmokeEditorFactory {
    static make(element, config) {

        const textarea = element.querySelector('textarea');
        const defaultValue = (typeof textarea.value === 'undefined') ? '' : textarea.value ;
        
        var plugins = [];
        config.plugins.forEach(function (pluginName) {
            try {
                plugins.push(PluginManager.get(pluginName));
            } catch (e) {
                console.log(pluginName, e);
            }
        });

        ReactDOM.render(
            <SmokeEditor
                debug={config.debug}
                plugins={plugins}
                targetElement={element}
                defaultValue={defaultValue}
            />,
            element
        );

    }
}

window.SmokeEditorFactory = SmokeEditorFactory;



