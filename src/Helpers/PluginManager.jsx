import plugins from "../plugins/Plugins";
import actions from "../actions/Actions";

let ACTIONS = {};
let PLUGINS = {};

export default class PluginManager {

    static set(type, name, value) {
        switch (type){
            case 'plugin':
                PLUGINS[name] = value;
                break;
            case 'action':
                ACTIONS[name] = value;
                break;
        }
    }

    static get(type, name) {

        switch (type){
            case 'plugin':
                return PLUGINS[name];
                break;
            case 'action':
                return ACTIONS[name];
                break;
        }

    }

    static getPlugins() {
        return PLUGINS;
    }
    static getActions() {
        return ACTIONS;
    }
}


PluginManager.set('action', 'BOLD', actions.bold);
PluginManager.set('action', 'ITALIC', actions.italic);
PluginManager.set('action', 'LINK', actions.link);
PluginManager.set('action', 'SUBTITLE', actions.subtitle);
PluginManager.set('action', 'BLOCKQUOTE', actions.blockquote);
PluginManager.set('plugin', 'EMBED', plugins.embed);
