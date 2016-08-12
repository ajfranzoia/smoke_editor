import audio from "../plugins/audio/plugin";
import kaltura from "../plugins/kaltura/plugin";
import video from "../plugins/video/plugin";
import embed from "../plugins/embed/plugin";
import bold from "../plugins/bold/plugin.jsx";
import headerOne from "../plugins/header-one/plugin.jsx";
import subtitle from "../plugins/subtitle/plugin.jsx";
import italic from "../plugins/italic/plugin.jsx";

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

