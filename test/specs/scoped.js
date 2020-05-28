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

    it('should return a function that applies styles to an element', () => {
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
        document.body.removeChild(element);
    });
    
    it('should return a function that applies styles to a DOM tree', () => {
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

        document.body.removeChild(div);
    });
});