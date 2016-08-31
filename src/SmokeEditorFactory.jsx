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
            const fieldName = DOMValidator.getAttributeOrThrow(textarea, 'data-field-name');
            const name = DOMValidator.getAttributeOrThrow(textarea, 'name');
            const id = DOMValidator.getAttributeOrThrow(textarea, 'id');

            let plugins = [];
            config.plugins.forEach(function (pluginName) {
                plugins.push(PluginManager.get('plugin', pluginName));
            });

            console.log('plugins -> ', plugins);

            let actions = [];
            config.actions.forEach(function (actionName) {
                actions.push(PluginManager.get('action', actionName));
            });

            console.log('actions -> ', actions);


            ReactDOM.render(
                <Smoke
                    debug={config.debug}
                    plugins={plugins}
                    actions={actions}
                    targetElement={element}
                    fieldName={fieldName}
                    name={name}
                    id={id}
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

