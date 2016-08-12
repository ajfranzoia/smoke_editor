import audio from "./audio/plugin.jsx";
import kaltura from "./kaltura/plugin.jsx";
import video from "./video/plugin.jsx";
import embed from "./embed/plugin.jsx";
import bold from "./bold/plugin.jsx";
import headerOne from "./header-one/plugin.jsx";
import subtitle from "./subtitle/plugin.jsx";
import italic from "./italic/plugin.jsx";

let PLUGIN = {};

export default class PluginManager {

    static set(name, value) {
        PLUGIN[name] = value;
    }

    static get(name) {
        return PLUGIN[name];
    }

    static getAll() {
        return PLUGIN;
    }
}

PluginManager.set('AUDIO', audio);
PluginManager.set('KALTURA', kaltura);
PluginManager.set('VIDEO', video);
PluginManager.set('EMBED', embed);
PluginManager.set('BOLD', bold);
PluginManager.set('H1', headerOne);
PluginManager.set('SUBTITLE', subtitle);
PluginManager.set('ITALIC', italic);

