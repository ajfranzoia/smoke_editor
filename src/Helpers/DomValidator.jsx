export default class DomValidator {

    static getElementByClassNameOrThrow(className) {
        const HTMLCollection = document.getElementsByClassName(className);
        if (HTMLCollection.length > 0) {
            return HTMLCollection;
        } else {
            throw new Error('HTMLCollection does not exist')
        }
    }

    static getElementByIdOrThrow(elementId) {
        const HTMLElement = document.getElementById(elementId);
        if (HTMLElement !== null) {
            return HTMLElement;
        } else {
            throw new Error('HTMLElement does not exist')
        }
    }

    static nodeExistOrThrow(node) {
        const HTMLElement = document.body.contains(node);
        if (HTMLElement) {
            return node;
        } else {
            throw new Error('HTMLNode does not exist')
        }
    }

    static getAttributeOrThrow(element, attr) {
        const HTMLElement = this.nodeExistOrThrow(element);
        const attributeValue = HTMLElement.getAttribute(attr);

        if (attributeValue !== null) {
            return attributeValue;
        } else {
            throw new Error('Attribute ' + attr + ' is null')
        }
    }

    static getFirstChildOrThrow(element, tag) {

        const HTMLElement = this.nodeExistOrThrow(element);
        const child = HTMLElement.querySelector(tag);

        if (child !== null) {
            return child;
        } else {
            throw new Error('Child ' + tag + ' is null')
        }
    }
}