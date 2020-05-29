import scoped from '../../src/scoped';

describe('scoped', () => {
    function hasScopedAttribute(element) {
        const attrs = element.attributes;
        for (let i = 0; i < attrs.length; i++) {
            if (attrs[i].name.startsWith('scoped')) {
                return true;
            }
        }
        return false;
    }

    it('should applies styles to an element', () => {
        const element = document.createElement('div');
        document.body.appendChild(element);

        const style = scoped(`
            div {
                width: 37px;
            }
        `);
        
        expect(style).to.be.a('function');
        expect(style(element)).to.equal(element);
        expect(hasScopedAttribute(element)).to.equal(true);
        expect(window.getComputedStyle(element).getPropertyValue('width')).to.equal('37px');
        element.remove();
    });
    
    it('should applies styles to a DOM tree', () => {
        const div = document.createElement('div');
        const section = div.appendChild(document.createElement('section'));
        const span = section.appendChild(document.createElement('span'));
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
        `);

        style(div);
        
        expect(hasScopedAttribute(div)).to.equal(true);
        expect(hasScopedAttribute(section)).to.equal(true);
        expect(hasScopedAttribute(span)).to.equal(true);

        expect(window.getComputedStyle(div).getPropertyValue('font-size')).to.equal('12px');
        expect(window.getComputedStyle(section).getPropertyValue('font-size')).to.equal('9px');
        expect(window.getComputedStyle(span).getPropertyValue('font-size')).to.equal('5.5px');

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
        
        expect(window.getComputedStyle(div).getPropertyValue('color')).to.equal('rgb(214, 122, 127)');
        expect(window.getComputedStyle(span).getPropertyValue('color')).to.not.equal('rgb(214, 122, 127)');

        div.remove();
        span.remove();
    });
});