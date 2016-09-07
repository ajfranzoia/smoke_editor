import sanitizeHtml from 'sanitize-html';
import domify from 'domify'
import embeds from './EmbedConfig'
import DomValidator from './domValidator'

export default class socialEmbed {

    static cleanHtml(string) {
        return sanitizeHtml(string, {
            allowedTags: ['blockquote', 'div', 'a','iframe'],
            allowedAttributes: {
                'a': ['href'],
                'iframe':['src'],
                'blockquote': ['class'],
                'div': ['class', 'data-*']
            }
        });
    };

    static matchSocialEmbed(value) {
        var clean = this.cleanHtml(value);
        var element = domify(clean);
        var block = "";

        if(element.nodeType == 1 ){
            for ( const key of Object.keys(embeds) ) {
                if(element.nodeName == embeds[key].domObj && element.getAttribute('class') == embeds[key].className){
                    block = embeds[key].blockName;
                }else{}
            }
            console.log('block name --> ',block);
        }else if(element.nodeType == 3){
            console.log('quizas es youtube')
        }





    }
}

