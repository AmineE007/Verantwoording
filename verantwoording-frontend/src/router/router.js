export default class Router {
    constructor() {
        this.routes = {
            '/registratie': this.loadRegistratiePage
            // Voeg meer routes toe zoals nodig
        };
    }

    init() {
        window.addEventListener('popstate', () => this.route());
        this.route();
    }

    route() {
        const path = window.location.pathname;
        const handler = this.routes[path] || this.routes['/registratie']; // Default naar registratie
        handler.call(this);
    }

    async loadRegistratiePage() {
        const { default: RegistratiePage } = await import('../pages/Registratie.js');
        const page = new RegistratiePage();
        page.render();
    }

    navigateTo(path) {
        window.history.pushState({}, '', path);
        this.route();
    }
}