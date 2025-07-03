export class Registratie {
    constructor() {
        this.element = document.createElement("div");
        this.header();
        this.render();
        this.footer();
    }

    header() {
        const header = new Header().getElement();
        this.element.appendChild(header);
    }

    footer() {
        const footer = new Footer().getElement();
        this.element.appendChild(footer);
    }

    render() {
        const content = document.createElement("main");
        content.classList.add("register-page");
        content.setAttribute("role", "main");
        content.setAttribute("aria-label", "Registratiepagina");

        content.innerHTML = `
            <form id="Registratie-Container" aria-labelledby="register-title">
                <h3 id="register-title">Account Registreren</h3>

                <div class="form-section">
                    <label for="email">E-mailadres</label>
                    <input id="email" type="email" name="email" required autocomplete="email">

                    <label for="password">Wachtwoord</label>
                    <input id="password" type="password" name="password" required autocomplete="new-password">

                    <label for="confirm_password">Herhaal Wachtwoord</label>
                    <input id="confirm_password" type="password" name="confirm_password" required autocomplete="new-password">
                </div>

                <div class="form-section">
                    <label for="first_name">Voornaam</label>
                    <input id="first_name" type="text" name="first_name" required>

                    <label for="last_name">Achternaam</label>
                    <input id="last_name" type="text" name="last_name" required>
                </div>

                <div class="form-section">
                    <label for="date_of_birth">Geboortedatum</label>
                    <input id="date_of_birth" type="date" name="date_of_birth">

                    <label for="phone_number">Telefoonnummer</label>
                    <input id="phone_number" type="tel" name="phone_number">
                </div>

                <div class="form-section">
                    <label for="address">Adres</label>
                    <input id="address" type="text" name="address">

                    <label for="city">Stad</label>
                    <input id="city" type="text" name="city">

                    <label for="postal_code">Postcode</label>
                    <input id="postal_code" type="text" name="postal_code">

                    <label for="country">Land</label>
                    <input id="country" type="text" name="country">
                </div>

                <button type="submit">Registreren</button>
            </form>
        `;

        this.element.appendChild(content);

        const form = content.querySelector("#Registratie-Container");
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
}