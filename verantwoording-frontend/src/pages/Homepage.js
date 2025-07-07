export default class Homepage {
    constructor() {
        this.element = document.createElement("div");
        this.render();
    }

    render() {
        // Clear existing content
        this.element.replaceChildren();
        
        const content = document.createElement("main");
        content.classList.add("homepage");
        content.setAttribute("role", "main");
        content.setAttribute("aria-label", "Homepage");

        // Create hero section
        const heroSection = this.createHeroSection();
        content.appendChild(heroSection);

        // Create navigation section
        const navSection = this.createNavigationSection();
        content.appendChild(navSection);

        // Create features section
        const featuresSection = this.createFeaturesSection();
        content.appendChild(featuresSection);

        this.element.appendChild(content);
    }

    createHeroSection() {
        const heroSection = document.createElement("section");
        heroSection.className = "hero-section";

        const title = document.createElement("h1");
        title.textContent = "Verantwoordelijk Bouwen";
        
        const subtitle = document.createElement("p");
        subtitle.textContent = "Bouw hier eenvoudig je PC";

        heroSection.appendChild(title);
        heroSection.appendChild(subtitle);

        return heroSection;
    }

    createNavigationSection() {
        const navSection = document.createElement("section");
        navSection.className = "navigation-section";

        const navCards = document.createElement("div");
        navCards.className = "nav-cards";

        // Navigation cards data
        const cardData = [
            { route: "/Productpage", title: "Producten", description: "Kijk hier voor losse producten", buttonText: "Naar Producten" },
            { route: "/Builderpage", title: "Bouwen", description: "Hier kan je je PC bouwen", buttonText: "Naar Bouwen" },
            { route: "/dashboard", title: "Dashboard", description: "Bekijk je overzicht", buttonText: "Naar Dashboard" }
        ];

        cardData.forEach(data => {
            const card = this.createNavCard(data);
            navCards.appendChild(card);
        });

        navSection.appendChild(navCards);
        return navSection;
    }

    createNavCard(data) {
        const card = document.createElement("div");
        card.className = "nav-card";
        card.setAttribute("data-route", data.route);

        const title = document.createElement("h3");
        title.textContent = data.title;

        const description = document.createElement("p");
        description.textContent = data.description;

        const button = document.createElement("button");
        button.textContent = data.buttonText;

        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(button);

        // Add click event listener
        card.addEventListener('click', (e) => {
            const route = card.getAttribute('data-route');
            if (route && window.appRouter) {
                window.appRouter.navigateTo(route);
            }
        });

        return card;
    }

    createFeaturesSection() {
        const featuresSection = document.createElement("section");
        featuresSection.className = "features-section";

        const title = document.createElement("h2");
        title.textContent = "Functionaliteiten";

        const featuresGrid = document.createElement("div");
        featuresGrid.className = "features-grid";

        // Features data
        const featuresData = [
            { title: "Gebruikersbeheer", description: "Beheer je accountgegevens en profiel" },
            { title: "Losse Producten", description: "Koop ook losse producten bij ons" },
            { title: "Configuratie", description: "Bouw de ideale PC voor jou" }
        ];

        featuresData.forEach(feature => {
            const featureItem = this.createFeatureItem(feature);
            featuresGrid.appendChild(featureItem);
        });

        featuresSection.appendChild(title);
        featuresSection.appendChild(featuresGrid);

        return featuresSection;
    }

    createFeatureItem(feature) {
        const item = document.createElement("div");
        item.className = "feature-item";

        const title = document.createElement("h4");
        title.textContent = feature.title;

        const description = document.createElement("p");
        description.textContent = feature.description;

        item.appendChild(title);
        item.appendChild(description);

        return item;
    }

    getElement() {
        return this.element;
    }

    appendTo(container) {
        container.appendChild(this.element);
    }
}
