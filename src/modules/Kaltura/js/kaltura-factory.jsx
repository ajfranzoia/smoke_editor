import KPlayer from "./kplayer.jsx"
import DOMValidator from "../../../Helpers/domValidator.jsx"

export default class KalturaFactory {

    static makeKaltura() {

        try {
            let collection = DOMValidator.foundByClassName("kaltura_player");

            Object.keys(collection).forEach(function (prop) {
                new KPlayer(collection[prop])
            })

        } catch(e) {
            Bugsnag.notify(e);
            console.log('Kaltura: ', e);
        }
    }
}