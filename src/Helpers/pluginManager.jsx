import audio from "../plugins/audio/plugin";
import kaltura from "../plugins/kaltura/plugin";
import video from "../plugins/video/plugin";
import embed from "../plugins/embed/plugin";

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

