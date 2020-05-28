import scoped from '../../src/scoped';

describe('scoped', () => {
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
        expect(window.getComputedStyle(element).getPropertyValue('width')).to.equal('37px');
        document.body.removeChild(element);
    });
});