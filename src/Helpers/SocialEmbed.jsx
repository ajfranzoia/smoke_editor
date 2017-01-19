import domify from 'domify';
import S from 'string';
import embedsList from './EmbedConfig';

export default class socialEmbed {

    static cleanHtml(string) {
        const regex = /<(\w+)[^>]*>/g;
        const str =  S(string).stripTags('p','a','time').s;

        if (regex.test(str)) {
            return str.match(regex);
        } else {
            return "";
        }
    }

    static cleanScript(string) {

        var div = document.createElement('div');
        div.innerHTML = string;
        var scripts = div.getElementsByTagName('script');
        var i = scripts.length;
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
            } else {
                this.displayError(url + ' no es una url válida');
            }
        }
    }


    static matchSocialEmbed(string) {

        var cleanedHtml = this.cleanHtml(string);

        let embedType = false;
        cleanedHtml.forEach(function (cleanedElement) {
            var element = domify(cleanedElement);

            for (let key of Object.keys(embedsList)) {
                const embed = embedsList[key];
                if (element.nodeName == embed.domObj) {
                    switch (embed.domObj) {
                        case 'IFRAME':
                            if (S(element.getAttribute(embed.compare.attr)).contains(embed.compare.value)) {
                                embedType = embed.blockName;
                            }
                            break;

                        default:
                            if (element.getAttribute(embed.compare.attr) == embed.compare.value) {
                                embedType = embed.blockName;
                            }
                            break;
                    }

                }
            }
        }.bind(embedType));

        return embedType;
    }

    static sanitizeScripsUrl(scriptArr){
        let validScripts = [];

        if(scriptArr.length > 0){
            scriptArr.forEach(function (val) {
                const domObj = domify(val);
                const attrValue = domObj.getAttribute('src');
                if(attrValue != null) {
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
        const scripts = this.sanitizeScripsUrl(this.findTagScript(data));

        const content = {content: this.cleanScript(data), script:scripts };
        const type = this.matchSocialEmbed(data);

        return {data: content, type: type};
    }

    static socialEmbedValidator(string, error = {status:'danger',text:'El embed que intentas agregar no es válido'}) {
        const embedType = this.matchSocialEmbed(string);

        if(embedType != false){
            return {status: 'success',text: '<strong>'+embedType + '</strong>'}
        }

        return error;
    }
}
