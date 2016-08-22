import React from 'react'
import ReactDOM from 'react-dom'
import Smoke from '../public/dist/components/Smoke'
import PluginManager from "../public/dist/Helpers/pluginManager";
import DOMValidator from "../public/dist/Helpers/domValidator";

export default class SmokeEditorFactory {
    static make(element, config) {

        try {
            const textarea = DOMValidator.getFirstChildOrThrow(element, 'textarea');

            const defaultValue = DOMValidator.getAttributeOrThrow(textarea, 'data-draft-json') ;

            let plugins = [];

            config.plugins.forEach(function (pluginName) {
                plugins.push(PluginManager.get(pluginName));
            });

            ReactDOM.render(
                <Smoke
                    debug={config.debug}
                    plugins={plugins}
                    targetElement={element}
                    defaultValue={defaultValue}
                />,
                element
            );

        } catch (e) {
            console.log(e);
        }
    }
}

window.SmokeEditorFactory = SmokeEditorFactory;

