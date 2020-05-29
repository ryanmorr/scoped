import csscope from '@ryanmorr/csscope';

function uuid() {
    return Math.random().toString(36).substr(2, 9);
}

function addCSSAttribute(element, attr) {
    if (element.nodeType === 1) {
        element.setAttribute(attr, '');
    }
    for (let i = 0, len = element.children.length; i < len; i++) {
        addCSSAttribute(element.children[i], attr);
    }
    return element;
}

export default function scoped(styles, attr = 'scoped-' + uuid()) {
    const style = document.createElement('style');
    style.setAttribute(attr, '');
    style.innerHTML = csscope(attr, styles);
    document.head.appendChild(style);
    return (element) => addCSSAttribute(element, attr);
}
