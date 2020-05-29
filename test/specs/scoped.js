import scoped from '../../src/scoped';

describe('scoped', () => {
    const styles = Array.from(document.querySelectorAll('style'));

    afterEach(() => {
        document.querySelectorAll('style').forEach((style) => {
            if (styles.indexOf(style) === -1) {
                style.remove();
            }
        });
    });

    function hasScopedAttribute(element, attr) {
        const attrs = element.attributes;
        for (let i = 0; i < attrs.length; i++) {
            if (attr != null && attrs[i].name === attr) {
                return true;
            } else if (attrs[i].name.startsWith('scoped')) {
                return true;
            }
        }
        return false;
    }

    function getStyle(element, prop) {
        return getComputedStyle(element).getPropertyValue(prop);
    }
    
    it('should create a stylesheet and apply styles to a DOM tree', () => {
        const div = document.createElement('div');
        const section = div.appendChild(document.createElement('section'));
        const span = section.appendChild(document.createElement('span'));
        const p = section.appendChild(document.createElement('p'));
        document.body.appendChild(div);

        const style = scoped(`
            div {
                font-size: 12px;
            }

            section {
                font-size: 9px;
            }

            span {
                font-size: 5.5px;
            }

            p {
                font-size: 4px;
            }
        `);

        style(div);
        
        expect(hasScopedAttribute(div)).to.equal(true);
        expect(hasScopedAttribute(section)).to.equal(true);
        expect(hasScopedAttribute(span)).to.equal(true);
        expect(hasScopedAttribute(p)).to.equal(true);

        const styles = document.querySelectorAll('style');
        expect(hasScopedAttribute(styles[styles.length - 1])).to.equal(true);

        expect(getStyle(div, 'font-size')).to.equal('12px');
        expect(getStyle(section, 'font-size')).to.equal('9px');
        expect(getStyle(span, 'font-size')).to.equal('5.5px');
        expect(getStyle(p, 'font-size')).to.equal('4px');

        div.remove();
    });

    it('should support providing the name of the unique attribute', () => {
        const div = document.createElement('div');
        const section = div.appendChild(document.createElement('section'));
        document.body.appendChild(div);

        const style = scoped(`
            div {
                width: 57px;
            }

            section {
                width: 43px;
            }
        `, 'scoped-foo');

        style(div);
        
        expect(hasScopedAttribute(div, 'scoped-foo')).to.equal(true);
        expect(hasScopedAttribute(section, 'scoped-foo')).to.equal(true);
        expect(hasScopedAttribute(document.querySelector('style[scoped-foo]'))).to.equal(true);

        expect(getStyle(div, 'width')).to.equal('57px');
        expect(getStyle(section, 'width')).to.equal('43px');

        div.remove();
    });

    it('should confine styles only to the DOM tree they were applied to', () => {
        const div = document.createElement('div');
        const span = document.createElement('span');
        div.classList.add('foo');
        span.classList.add('foo');
        document.body.appendChild(div);
        document.body.appendChild(span);

        const style = scoped(`
            .foo {
                color: rgb(214, 122, 127);
            }
        `);

        style(div);
        
        expect(getStyle(div, 'color')).to.equal('rgb(214, 122, 127)');
        expect(getStyle(span, 'color')).to.not.equal('rgb(214, 122, 127)');

        div.remove();
        span.remove();
    });

    it('should support multiple scoped styles', () => {
        const element = document.createElement('div');
        element.classList.add('foo');
        document.body.appendChild(element);

        const width = scoped(`
            .foo {
                width: 41px;
            }
        `);

        const height = scoped(`
            .foo {
                height: 26px;
            }
        `);

        width(height(element));

        expect(getStyle(element, 'width')).to.equal('41px');
        expect(getStyle(element, 'height')).to.equal('26px');

        element.remove();
    });
});