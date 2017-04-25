import domify from 'domify';
import S from 'string';
import embedsList from './EmbedConfig';
import Errors from './ErrorMessages';

export default class socialEmbed {

    static cleanHtml(string) {
        const regex = /<(\w+)[^>]*>/g;
        const str =  S(string).stripTags('p','a','time').s;

        if (regex.test(str)) {
            return str.match(regex);
        } else {
            return [];
        }
    }

    static cleanScript(string) {

        let div = document.createElement('div');
        div.innerHTML = string;
        let scripts = div.getElementsByTagName('script');
        let i = scripts.length;
        while (i--) {
            scripts[i].parentNode.removeChild(scripts[i]);
        }
        return div.innerHTML;
    }

    static findTagScript(string) {
        const regex = /<script(.*?)<\/script>/gi;
        if (regex.test(string)) {
            return string.match(regex);
        }
        return [];
    }

    static validateUrl(url, compare) {
        if (S(url).startsWith('http://', 'https://')) {
            if (S(url).contains(compare)) {
                return true;
            }
        }
        return false;
    }

    static generateValidUrl(url) {

        if (S(url).startsWith('http://', 'https://')) {
            return url;
        } else {
            if (S(url).startsWith('//')) {
                return S(url).replaceAll('//', 'https://').s
            } else if (S(url).startsWith('./')) {
                return S(url).replaceAll('./', 'https://').s
            }
        }
    }


    static matchSocialEmbed(string) {

        let cleanedHtml = this.cleanHtml(string);
        let embedType = 'corrupted-embed';

        cleanedHtml.forEach(cleanedElement => {
            let element = domify(cleanedElement);

            for (let key of Object.keys(embedsList)) {
                let embed = embedsList[key];

                if (element.nodeName === embed.domObj) {
                    switch (embed.domObj) {
                        case 'IFRAME':
                            if (S(element.getAttribute(embed.compare.attr)).contains(embed.compare.value)) {
                                embedType = embed.blockName;
                            }
                            break;

                        default:
                            if (element.getAttribute(embed.compare.attr) === embed.compare.value) {
                                embedType = embed.blockName;
                            }
                            break;
                    }
                }
            }
        });
        return embedType;
    }

    static sanitizeScripsUrl(scriptArr){
        let validScripts = [];

        if(scriptArr.length > 0){
            scriptArr.forEach(function (val) {
                const domObj = domify(val);
                const attrValue = domObj.getAttribute('src');
                if(attrValue !== null) {
                    const newAttrValue = this.generateValidUrl(attrValue);
                    validScripts.push('<script src="' + newAttrValue + '" async ></script>');
                } else {
                    validScripts.push(val);
                }
            }.bind(this));
            return validScripts
        }

        return validScripts;
    }

    static createDataObject(data) {
        let scripts = this.sanitizeScripsUrl(this.findTagScript(data)),
            content = {content: this.cleanScript(data), script:scripts },
            type = this.matchSocialEmbed(data);

        return {data: content, type: type};
    }

    static socialEmbedValidator(string, error = {status:'warning',text:Errors.message.embed.warning}) {
        const embedType = this.matchSocialEmbed(string);

        if(embedType !== 'corrupted-embed'){
            return {status: 'success',text: '<strong>'+embedType + '</strong>'}
        }

        return error;
    }
}
