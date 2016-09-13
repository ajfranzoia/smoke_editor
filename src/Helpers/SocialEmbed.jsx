import domify from 'domify'
import S from 'string';
import embedsList from './EmbedConfig'

export default class socialEmbed {

    static cleanHtml(string) {
        return S(string).stripTags('script').s
    }

    static findTagScript(string) {
        const regex = /<script(.*?)<\/script>/gi;
        if (regex.test(string)) {
            return string.match(regex);
        }
        return [];
    }

    static inspectUrl(url, compare) {
        if (S(url).startsWith('http://', 'https://')) {
            if (S(url).contains(compare)) {
                return true;
            }
        }
        return false;
    }

    static matchSocialEmbed(string) {
        var element = domify(this.cleanHtml(string));
        const isXMLNode = 1;
        const isStringNode = 3;

        for (let key of Object.keys(embedsList)) {
            const embed = embedsList[key];

            if (element.nodeName == embed.domObj) {
                if (element.nodeType == isXMLNode) {
                    switch (embed.domObj) {
                        case 'IFRAME':
                            if (S(element.getAttribute(embed.compare.attr)).contains(embed.compare.value)) {
                                this.displayError(embed.blockName + ' es un embed valido');
                                return embed.blockName;
                            }
                            break;

                        default:
                            if (element.getAttribute(embed.compare.attr) == embed.compare.value) {
                                this.displayError(embed.blockName + ' es un embed valido');
                                return embed.blockName;
                            }
                            break;
                    }

                } else if (element.nodeType == isStringNode) {
                    if (this.inspectUrl(string, embed.compare.value)) {
                        this.displayError(embed.blockName + ' es un embed valido');
                        return embed.blockName
                    }
                }
            }
        }
        this.displayError();
    }

    static createDataObject(data) {
        const content = {content: this.cleanHtml(data), script: this.findTagScript(data)};
        const type = this.matchSocialEmbed(data);

        return {data: content, type: type};
    }

    static displayError (error = 'error'){
        console.log('Mensaje de error --> ',error);
    }
}

