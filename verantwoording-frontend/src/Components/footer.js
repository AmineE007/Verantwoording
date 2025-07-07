export default class Footer {
    constructor() {
        this.footerElement = document.createElement('footer');
        this.footerElement.className = 'footer';
        this.footerElement.setAttribute('role', 'contentinfo');
        
        const footerText = document.createElement('p');
        footerText.textContent = '© 2025 Verantwoording. Alle rechten voorbehouden.';
        
        this.footerElement.appendChild(footerText);
    }

    render() {
        return this.footerElement;
    }

    appendTo(container) {
        container.appendChild(this.footerElement);
    }
}