
-- ==============================
-- TABEL: Customers
-- Beschrijving: Alle klanten (zowel geregistreerde als niet-geregistreerde)
-- ==============================
CREATE TABLE Customers (
                           id SERIAL PRIMARY KEY,
                           first_name VARCHAR(255),
                           last_name VARCHAR(255),
                           email VARCHAR(255),  -- UNIQUE constraint verwijderd, wordt in code afgehandeld
                           date_of_birth DATE,
                           phone_number VARCHAR(20),
                           address VARCHAR(255),
                           city VARCHAR(255),
                           state VARCHAR(255),
                           postal_code VARCHAR(255),
                           country VARCHAR(255)
);

-- ==============================
-- TABEL: Users
-- Beschrijving: Geregistreerde klanten (subset van Customers)
-- Elke User hoort bij precies één Customer
-- ==============================
CREATE TABLE Users (
                       id SERIAL PRIMARY KEY,
                       customer_id INT UNIQUE REFERENCES Customers(id),
                       email VARCHAR(255) NOT NULL,  -- UNIQUE constraint verwijderd, wordt in code afgehandeld
                       password VARCHAR(255) NOT NULL
);

-- ==============================
-- TABEL: Guests
-- Beschrijving: Niet-geregistreerde klanten
-- Worden gebruikt voor guest checkouts
-- ==============================
CREATE TABLE Guests (
                        id SERIAL PRIMARY KEY,
                        guest_name VARCHAR(255),
                        guest_email VARCHAR(255),
                        guest_address VARCHAR(255),
                        guest_city VARCHAR(255),
                        guest_state VARCHAR(255),
                        guest_postal_code VARCHAR(255),
                        guest_country VARCHAR(255)
);

-- ==============================
-- TABEL: Registrations
-- Beschrijving: Geschiedenis van registratiegegevens
-- Handig voor analyse of logging
-- ==============================
CREATE TABLE Registrations (
                               id SERIAL PRIMARY KEY,
                               user_id INT REFERENCES Users(id),
                               registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                               registration_ip VARCHAR(45)
);

-- ==============================
-- TABEL: Logins
-- Beschrijving: Logging van loginpogingen
-- Inclusief IP-adres en of het succesvol was
-- ==============================
CREATE TABLE Logins (
                        id SERIAL PRIMARY KEY,
                        user_id INT REFERENCES Users(id),
                        login_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        success BOOLEAN,
                        ip_address VARCHAR(45)
);

-- ==============================
-- TABEL: Orders
-- Beschrijving: Bestellingen, gelinkt aan een Customer of een Guest
-- ==============================
CREATE TABLE Orders (
                        id SERIAL PRIMARY KEY,
                        customer_id INT REFERENCES Customers(id),
                        guest_id INT REFERENCES Guests(id),
                        order_date DATE,
                        required_date DATE,
                        shipped_date DATE,
                        status INT,
                        comments VARCHAR(255)
);

-- ==============================
-- TABEL: Builds
-- Beschrijving: Custom of prebuilt systemen van klanten
-- ==============================
CREATE TABLE Builds (
                        id UUID PRIMARY KEY,
                        name VARCHAR(255),
                        prebuilt BOOLEAN,
                        customer_id INT REFERENCES Customers(id)
);

-- ==============================
-- TABEL: Components
-- Beschrijving: Losse hardware componenten (CPU, GPU, etc.)
-- ==============================
CREATE TABLE Components (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255),
                            price NUMERIC(5, 2),
                            category VARCHAR(255),  -- Vervangen van category_id door directe enum string
                            stock INT,
                            chipset INT,
                            image_id INT
);

-- ==============================
-- KoppelTABEL: build_components (naam omgedraaid)
-- Beschrijving: Veel-op-veel relatie tussen Components en Builds
-- ==============================
CREATE TABLE build_components (
                                  build_id UUID REFERENCES Builds(id),
                                  component_id INT REFERENCES Components(id),
                                  PRIMARY KEY (build_id, component_id)
);

-- ==============================
-- KoppelTABEL: order_components (naam omgedraaid)
-- Beschrijving: Veel-op-veel relatie tussen Components en Orders
-- ==============================
CREATE TABLE order_components (
                                  order_id INT REFERENCES Orders(id),
                                  component_id INT REFERENCES Components(id),
                                  PRIMARY KEY (order_id, component_id)
);

-- ==============================
-- TABEL: Attributes
-- Beschrijving: Eigenschappen van componenten (zoals kleur, formaat)
-- ==============================
CREATE TABLE Attributes (
                            id SERIAL PRIMARY KEY,
                            name VARCHAR(255),
                            data_type VARCHAR(255)
);

-- ==============================
-- TABEL: Attribute_Values
-- Beschrijving: Mogelijke waarden voor elk attribuut
-- ==============================
CREATE TABLE Attribute_Values (
                                  id SERIAL PRIMARY KEY,
                                  attribute_id INT REFERENCES Attributes(id),
                                  value VARCHAR(255),
                                  hex VARCHAR(9), -- bijvoorbeeld voor kleurcodes
                                  source VARCHAR(255), -- optioneel: afbeelding of icon
                                  alt VARCHAR(255) -- beschrijving of alt-tekst
);

-- ==============================
-- KoppelTABEL: component_attribute_values (naam omgedraaid)
-- Beschrijving: Koppelt waardes van attributen aan componenten
-- ==============================
CREATE TABLE component_attribute_values (
                                            component_id INT REFERENCES Components(id),
                                            attribute_value_id INT REFERENCES Attribute_Values(id),
                                            PRIMARY KEY (component_id, attribute_value_id)
);
ALTER TABLE Customers
    ALTER COLUMN phone_number TYPE VARCHAR(20);