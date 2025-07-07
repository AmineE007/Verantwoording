export default class Router {
    constructor() {
        this.routes = {
            '/': this.loadHomepage,
            '/homepage': this.loadHomepage,
            '/registratie': this.loadRegistratiePage,
            '/login': this.loadLoginPage,
            '/dashboard': this.loadDashboardPage
        };
    }

    init() {
        // Maak router globaal beschikbaar
        window.appRouter = this;
        
        window.addEventListener('popstate', () => this.route());
        this.route();
    }

    route() {
        const path = window.location.pathname;
        
        // Redirect van /homepage naar / (root)
        if (path === '/homepage') {
            window.history.replaceState({}, '', '/');
            this.routes['/'].call(this);
            return;
        }
        
        const handler = this.routes[path] || this.routes['/']; // Default naar homepage
        handler.call(this);
    }

    async loadHomepage() {
        const { default: Homepage } = await import('../pages/Homepage.js');
        const page = new Homepage();
        
        // Clear de main container
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
            mainContainer.replaceChildren();
            page.appendTo(mainContainer);
        }
    }

    async loadRegistratiePage() {
        const { default: RegistratiePage } = await import('../pages/Registratie.js');
        const page = new RegistratiePage();
        
        // Clear de main container
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
            mainContainer.replaceChildren();
            page.appendTo(mainContainer);
        }
    }

    async loadLoginPage() {
        // Voor nu een placeholder - je kunt later een Login component maken
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
            // Clear container
            mainContainer.replaceChildren();
            
            // Create placeholder content
            const container = document.createElement('div');
            container.style.padding = '40px';
            container.style.textAlign = 'center';
            
            const title = document.createElement('h2');
            title.textContent = 'Login Pagina';
            
            const description = document.createElement('p');
            description.textContent = 'Deze pagina is nog niet geïmplementeerd.';
            
            const backButton = document.createElement('button');
            backButton.textContent = 'Terug naar Home';
            backButton.addEventListener('click', () => {
                window.appRouter.navigateTo('/');
            });
            
            container.appendChild(title);
            container.appendChild(description);
            container.appendChild(backButton);
            mainContainer.appendChild(container);
        }
    }

    async loadDashboardPage() {
        // Voor nu een placeholder - je kunt later een Dashboard component maken
        const mainContainer = document.getElementById('main-container');
        if (mainContainer) {
            // Clear container
            mainContainer.replaceChildren();
            
            // Create placeholder content
            const container = document.createElement('div');
            container.style.padding = '40px';
            container.style.textAlign = 'center';
            
            const title = document.createElement('h2');
            title.textContent = 'Dashboard';
            
            const description = document.createElement('p');
            description.textContent = 'Deze pagina is nog niet geïmplementeerd.';
            
            const backButton = document.createElement('button');
            backButton.textContent = 'Terug naar Home';
            backButton.addEventListener('click', () => {
                window.appRouter.navigateTo('/');
            });
            
            container.appendChild(title);
            container.appendChild(description);
            container.appendChild(backButton);
            mainContainer.appendChild(container);
        }
    }

    navigateTo(path) {
        window.history.pushState({}, '', path);
        this.route();
    }
}