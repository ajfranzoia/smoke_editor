export default class DomValidator{

    static foundByClassName(className){
        var HTMLCollection = document.getElementsByClassName(className);
        if(HTMLCollection.length > 0){
            return HTMLCollection;
        }else{
            throw new Error('HTMLCollection does not exist')
        }
    }

    static foundById (elementId){
        var HTMLElement = document.getElementById(elementId);
        if(!!HTMLElement){
            return HTMLElement;
        }else{
            throw new Error('HTMLElement does not exist')
        }
    }

    
}