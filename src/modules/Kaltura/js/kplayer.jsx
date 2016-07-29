import AsyncHelper from "../../../Helpers/AsyncHelper/js/asyncHelper.jsx"

export default class Kaltura {

    constructor(kObject) {
        this.kalturaItem = kObject;
        this.init();

    };
    
    init() {
        var url = 'https://vodgc.com/html5/html5lib/v2.40/mwEmbedLoader.php/p/' + this.kalturaItem.dataset.pid +
            '/uiconf_id/' + this.kalturaItem.dataset.uiconfig,
            self = this;

        AsyncHelper.loadFile(url)
            .then(function(){
                self.resolve(self.kalturaItem);
            });

    }

    resolve(data) {

        var entryid = data.dataset.entryid,
            kFlashvars = {};
        switch (data.dataset.embedtype) {
            case 'dynamic':
                try {
                    kWidget.embed({
                        "targetId": data.id,
                        "wid": data.dataset.wid,
                        "uiconf_id": data.dataset.uiconfig,
                        'flashvars': kFlashvars,
                        "entry_id": data.dataset.entryid
                    });
                } catch (e) {
                    Bugsnag.notify(e);
                }
                break;
            case 'thumbnail':

                kFlashvars = {
                    "autoplay": false,
                    "streamerType": "auto",
                    "IframeCustomPluginCss1": 'css/custom-skin.css',
                    "durationLabel.prefix": "| ",
                    "volumeControl": {
                        "layout": "vertical"
                    },
                    "strings": {
                        "mwe-embedplayer-play_clip": "Reproducir",
                        "mwe-embedplayer-pause_clip": "Pausa",
                        "mwe-embedplayer-player_fullscreen": "Pantalla Completa",
                        "mwe-embedplayer-player_closefullscreen": "Salir pantalla completa",
                        "mwe-embedplayer-volume-mute": "Mutear",
                        "mwe-embedplayer-volume-unmute": "Sonido On",
                        "mwe-embedplayer-next_clip": "Siguiente",
                        "mwe-embedplayer-prev_clip": "Anterior",
                        "mwe-embedplayer-replay": "Volver a Ver"
                    },
                    "vast": {
                        //@TODO: set up vast only if mobile
                    }
                };
                try {
                    kWidget.thumbEmbed({
                        "targetId": data.id,
                        "wid":"_" + data.dataset.pid,
                        "uiconf_id": data.dataset.uiconfig,
                        'flashvars': kFlashvars,
                        "entry_id": data.dataset.entryid
                    });
                } catch (e) {
                    Bugsnag.notify(e);
                    throw new Error(e);
                }
                break;
        }
    }
}
