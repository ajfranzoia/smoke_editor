import domify from 'domify'
import S from 'string';
import embedsList from './EmbedConfig'

export default class socialEmbed {

    static cleanHtml(string) {
        return S(string).stripTags('script').s
    };

    static findTagScript(string) {
        const regex = /<script(.*?)<\/script>/gi;
        if (regex.test(string)) {
            return string.match(regex);
        }
        return [];
    }

    static matchSocialEmbed(string) {
        var element = domify(this.cleanHtml(string));
        var block = "";

        if (element.nodeType == 1) {
            for (const key of Object.keys(embedsList)) {
                const embed = embedsList[key];
                if (element.nodeName == embed.domObj) {
                    if (element.getAttribute(embed.compare.attr) == embed.compare.value) {
                        block = embed.blockName;
                    }
                }
            }

            return block;

        } else if (element.nodeType == 3) {
            console.log('quizas es youtube')
        }
    }

    static createScriptArray(string) {
        const arrScripts = this.findTagScript(string);
        let arrSrc = [];

        if(arrScripts.length > 0){
            arrScripts.forEach(function (value) {
                arrSrc.push(value);
            });
            return arrSrc;
        }
        return arrSrc;
    }

    static createDataObject(data) {
        const content = {content: this.cleanHtml(data), script: this.createScriptArray(data)};
        const type = this.matchSocialEmbed(data);
        return {data: content, type: type};
    }
}

