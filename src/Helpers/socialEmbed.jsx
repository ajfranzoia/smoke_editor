export default class socialEmbed {
    static matchSocialEmbed(value) {
        var res = this.testTwitter(value);
        var res = this.testFacebook(value);
        var res = this.testInstagram(value);
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

