import '../styles/Registratie.css';

export default class Registratie {
    constructor() {
        this.element = document.createElement("div");
        this.render();
    }

    render() {
        this.element.replaceChildren();

        const content = document.createElement("main");
        content.classList.add("register-page");
        content.setAttribute("role", "main");
        content.setAttribute("aria-label", "Registratiepagina");

        const form = this.createRegistrationForm();
        content.appendChild(form);

        this.element.appendChild(content);
    }

    createRegistrationForm() {
        const form = document.createElement("form");
        form.id = "Registratie-Container";
        form.setAttribute("aria-labelledby", "register-title");

        const title = document.createElement("h3");
        title.id = "register-title";
        title.textContent = "Account Registreren";
        form.appendChild(title);

        form.appendChild(this.createPersonalSection());
        form.appendChild(this.createContactSection());
        form.appendChild(this.createAddressSection());
        form.appendChild(this.createSubmitButton());

        this.addFormEventListener(form);

        return form;
    }

    createPersonalSection() {
        return this.createSection([
            { id: "email", type: "email", label: "E-mailadres", required: true, autocomplete: "email" },
            { id: "password", type: "password", label: "Wachtwoord", required: true, autocomplete: "new-password" },
            { id: "confirm_password", type: "password", label: "Herhaal Wachtwoord", required: true, autocomplete: "new-password" }
        ]);
    }

    createContactSection() {
        return this.createSection([
            { id: "first_name", type: "text", label: "Voornaam", required: true },
            { id: "last_name", type: "text", label: "Achternaam", required: true }
        ]);
    }

    createAddressSection() {
        return this.createSection([
            { id: "date_of_birth", type: "date", label: "Geboortedatum" },
            { id: "phone_number", type: "tel", label: "Telefoonnummer" },
            { id: "address", type: "text", label: "Adres" },
            { id: "city", type: "text", label: "Stad" },
            { id: "state", type: "text", label: "Provincie" },
            { id: "postal_code", type: "text", label: "Postcode" },
            { id: "country", type: "text", label: "Land" }
        ]);
    }

    createSection(fields) {
        const section = document.createElement("div");
        section.className = "form-section";
        fields.forEach(field => section.appendChild(this.createFormField(field)));
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

            if (formData.get("password") !== formData.get("confirm_password")) {
                alert("Wachtwoorden komen niet overeen!");
                return;
            }

            const registrationData = {
                firstName: formData.get("first_name"),
                lastName: formData.get("last_name"),
                email: formData.get("email"),
                password: formData.get("password"),
                dateOfBirth: formData.get("date_of_birth") || null,
                phoneNumber: formData.get("phone_number") || null,
                address: formData.get("address") || null,
                city: formData.get("city") || null,
                state: formData.get("state") || null,
                postalCode: formData.get("postal_code") || null,
                country: formData.get("country") || null
            };
            const contextPath = window.location.pathname;startsWith('/verantwoording_war_exploded')
                ? '/verantwoording_war_exploded'
                : '';

            const apiUrl = '/api/registratie'; // Adjust the API endpoint as needed

            try {
                // Step 3: Use apiUrl in your fetch call
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(registrationData)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Registratie mislukt');
                }

                const data = await response.json();
                alert(data.message || 'Registratie succesvol!');
                window.location.href = '/login';
            } catch (error) {
                console.error('Fout bij registratie:', error);
                alert(error.message || 'Er is een fout opgetreden bij de registratie');
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