export default class Header {
    constructor() {
        this.headerElement = document.createElement('header');
        this.headerElement.className = 'header';
        this.headerElement.setAttribute('role', 'banner');
        this.headerElement.setAttribute('aria-label', 'Hoofdnavigatie');
        
        // Create title
        const title = document.createElement('h1');
        title.className = 'header-title';
        
        const titleLink = document.createElement('a');
        titleLink.textContent = 'Verantwoording';
        titleLink.href = '/';
        titleLink.className = 'header-title-link';
        
        // Add click event to prevent default and use router
        titleLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (window.appRouter) {
                window.appRouter.navigateTo('/');
            }
        });
        
        title.appendChild(titleLink);
        
        // Create navigation
        const nav = document.createElement('nav');
        nav.className = 'nav-buttons';
        
        const navItems = [
            { text: 'Registratie', href: '/registratie' },
            { text: 'Login', href: '/login' },
            { text: 'Dashboard', href: '/dashboard' }
        ];

        navItems.forEach(item => {
            const button = document.createElement('button');
            button.textContent = item.text;
            button.className = 'nav-button';
            button.setAttribute('data-href', item.href);
            
            // Add click event to use router
            button.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.appRouter) {
                    window.appRouter.navigateTo(item.href);
                }
            });
            
            nav.appendChild(button);
        });
        this.headerElement.appendChild(title);
        this.headerElement.appendChild(nav);
    }

    render() {
        return this.headerElement;
    }

    appendTo(container) {
        container.appendChild(this.headerElement);
    }
}

