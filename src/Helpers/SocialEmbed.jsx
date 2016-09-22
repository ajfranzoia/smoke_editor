import domify from 'domify';
import S from 'string';
import embedsList from './EmbedConfig';

export default class socialEmbed {

    static cleanHtml(string) {
        console.log("S(string).stripTags('script').s --> ",S(string).stripTags('script').s)
        return S(string).stripTags('script').s
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
        var element = domify(this.cleanHtml(string));

        for (let key of Object.keys(embedsList)) {
            const embed = embedsList[key];
            if (element.nodeName == embed.domObj) {
                switch (embed.domObj) {
                    case 'IFRAME':
                        if (S(element.getAttribute(embed.compare.attr)).contains(embed.compare.value)) {
                            return embed.blockName;
                        }
                        break;

                    default:
                        if (element.getAttribute(embed.compare.attr) == embed.compare.value) {
                            return embed.blockName;
                        }
                        break;
                }

            }
        }

        return false;
    }

    static sanitizeScripsUrl(scriptArr){
        let validScripts = [];

        if(scriptArr.length > 0){
            scriptArr.forEach(function (val) {
                const domObj = domify(val);
                const attrValue = domObj.getAttribute('src');
                const newAttrValue = this.generateValidUrl(attrValue);
                validScripts.push('<script src="'+newAttrValue+'" async ></script>');
            }.bind(this));
            return validScripts
        }

        return validScripts;
    }

    static createDataObject(data) {
        const scripts = this.sanitizeScripsUrl(this.findTagScript(data));

        const content = {content: this.cleanHtml(data), script:scripts };
        const type = this.matchSocialEmbed(data);

        return {data: content, type: type};
    }

    static socialEmbedValidator(string, error = {status:'danger',text:'El embed que intentas agregar no es válido'}) {
        const embedType = this.matchSocialEmbed(string);

        if(embedType != false){
            return {status: 'success',text: '<strong>'+embedType + '</strong>' + ' es un embed válido'}
        }

        return error;
    }
}

