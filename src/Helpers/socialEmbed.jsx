export default class socialEmbed {
    static matchSocialEmbed(value) {

        //@todo: iterar cada embed para ver con cual matchea
        var res = this.testTwitter(value);
        console.log('res ->', res);
    }
    static testTwitter(value){
        return value.search(/(twitter-tweet)/);
    }

    static testFacebook(value){
        return value.search(/(Facebook)/);
    }

    static testInstagram(value){
        return value.search(/(instagram)/);
    }
}

