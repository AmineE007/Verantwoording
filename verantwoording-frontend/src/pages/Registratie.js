import '../styles/Registratie.css';
export default class Registratie {
    constructor() {
        this.element = document.createElement("div");
        this.render();
    }

    render() {
        // Clear existing content
        this.element.replaceChildren();
        
        const content = document.createElement("main");
        content.classList.add("register-page");
        content.setAttribute("role", "main");
        content.setAttribute("aria-label", "Registratiepagina");

        // Create form
        const form = this.createRegistrationForm();
        content.appendChild(form);
        
        this.element.appendChild(content);
    }

    createRegistrationForm() {
        const form = document.createElement("form");
        form.id = "Registratie-Container";
        form.setAttribute("aria-labelledby", "register-title");

        // Create title
        const title = document.createElement("h3");
        title.id = "register-title";
        title.textContent = "Account Registreren";
        form.appendChild(title);

        // Create form sections
        const personalSection = this.createPersonalSection();
        const contactSection = this.createContactSection();
        const addressSection = this.createAddressSection();
        const submitButton = this.createSubmitButton();

        form.appendChild(personalSection);
        form.appendChild(contactSection);
        form.appendChild(addressSection);
        form.appendChild(submitButton);

        // Add form submit event listener
        this.addFormEventListener(form);

        return form;
    }

    createPersonalSection() {
        const section = document.createElement("div");
        section.className = "form-section";

        const fields = [
            { id: "email", type: "email", label: "E-mailadres", required: true, autocomplete: "email" },
            { id: "password", type: "password", label: "Wachtwoord", required: true, autocomplete: "new-password" },
            { id: "confirm_password", type: "password", label: "Herhaal Wachtwoord", required: true, autocomplete: "new-password" }
        ];

        fields.forEach(field => {
            const fieldContainer = this.createFormField(field);
            section.appendChild(fieldContainer);
        });

        return section;
    }

    createContactSection() {
        const section = document.createElement("div");
        section.className = "form-section";

        const fields = [
            { id: "first_name", type: "text", label: "Voornaam", required: true },
            { id: "last_name", type: "text", label: "Achternaam", required: true }
        ];

        fields.forEach(field => {
            const fieldContainer = this.createFormField(field);
            section.appendChild(fieldContainer);
        });

        return section;
    }

    createAddressSection() {
        const section = document.createElement("div");
        section.className = "form-section";

        const fields = [
            { id: "date_of_birth", type: "date", label: "Geboortedatum" },
            { id: "phone_number", type: "tel", label: "Telefoonnummer" },
            { id: "address", type: "text", label: "Adres" },
            { id: "city", type: "text", label: "Stad" },
            { id: "postal_code", type: "text", label: "Postcode" },
            { id: "country", type: "text", label: "Land" }
        ];

        fields.forEach(field => {
            const fieldContainer = this.createFormField(field);
            section.appendChild(fieldContainer);
        });

        return section;
    }

    createFormField(field) {
        const container = document.createElement("div");
        
        const label = document.createElement("label");
        label.setAttribute("for", field.id);
        label.textContent = field.label;
        
        const input = document.createElement("input");
        input.id = field.id;
        input.type = field.type;
        input.name = field.id;
        if (field.required) input.required = true;
        if (field.autocomplete) input.autocomplete = field.autocomplete;
        
        container.appendChild(label);
        container.appendChild(input);
        
        return container;
    }

    createSubmitButton() {
        const button = document.createElement("button");
        button.type = "submit";
        button.textContent = "Registreren";
        return button;
    }

    addFormEventListener(form) {
        form.addEventListener("submit", async (event) => {
            event.preventDefault();

            const formData = new FormData(form);

            // Wachtwoord validatie
            if (formData.get("password") !== formData.get("confirm_password")) {
                alert("Wachtwoorden komen niet overeen!");
                return;
            }

            const registrationData = {
                firstName: formData.get("first_name"),
                lastName: formData.get("last_name"),
                email: formData.get("email"),
                password: formData.get("password"),
                dateOfBirth: formData.get("date_of_birth"),
                phoneNumber: formData.get("phone_number"),
                address: formData.get("address"),
                city: formData.get("city"),
                postalCode: formData.get("postal_code"),
                country: formData.get("country")
            };

            try {
                const response = await fetch("/Verantwoording_war_exploded/api/registratie", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(registrationData)
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Registratie succesvol!");
                    window.location.href = "/login"; // Pas aan naar je login pagina
                } else {
                    alert(data.message || "Registratie mislukt!");
                }
            } catch (error) {
                console.error("Fout bij registreren:", error);
                alert("Er is een fout opgetreden, probeer opnieuw.");
            }
        });
    }

    getElement() {
        return this.element;
    }

    appendTo(container) {
        container.appendChild(this.element);
    }
}