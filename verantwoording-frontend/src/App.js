import Router from './router/router.js';
import Header from './Components/Header.js';
import Footer from './Components/footer.js'; // Zorg ervoor dat je de Footer component importeert
export default class App {
    constructor() {
        this.router = new Router();
        this.header = new Header();
        this.footer = new Footer();
    }

    init() {
        // Zoek de app container
        const appContainer = document.getElementById('app');
        if (!appContainer) {
            console.error('App container not found!');
            return;
        }
        
        // Voeg header toe aan de app container
        this.header.appendTo(appContainer);
        
        // Maak een container voor de main content
        const mainContainer = document.createElement('main');
        mainContainer.id = 'main-container';
        appContainer.appendChild(mainContainer);
        
        // Voeg footer toe aan de app container
        this.footer.appendTo(appContainer);
        
        // Initialiseer de router
        this.router.init();
    }
}
