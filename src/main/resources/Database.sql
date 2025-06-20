-- ==============================
-- TABEL: Customers
-- Beschrijving: Alle klanten (zowel geregistreerde als niet-geregistreerde)
-- ==============================
CREATE TABLE Customers (
                           id SERIAL PRIMARY KEY,
                           first_name VARCHAR(255),
                           last_name VARCHAR(255),
                           email VARCHAR(255) UNIQUE,
                           date_of_birth DATE,
                           phone_number INT,
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
                       email VARCHAR(255) UNIQUE NOT NULL,
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
                            category_id INT,
                            stock INT,
                            chipset INT,
                            image_id INT
);

-- ==============================
-- KoppelTABEL: Components_Builds
-- Beschrijving: Veel-op-veel relatie tussen Components en Builds
-- ==============================
CREATE TABLE Components_Builds (
                                   component_id INT REFERENCES Components(id),
                                   build_id UUID REFERENCES Builds(id),
                                   PRIMARY KEY (component_id, build_id)
);

-- ==============================
-- KoppelTABEL: Components_Orders
-- Beschrijving: Veel-op-veel relatie tussen Components en Orders
-- ==============================
CREATE TABLE Components_Orders (
                                   component_id INT REFERENCES Components(id),
                                   order_id INT REFERENCES Orders(id),
                                   PRIMARY KEY (component_id, order_id)
);

-- ==============================
-- TABEL: Categories
-- Beschrijving: Categorieën voor componenten (bijv. RAM, CPU, etc.)
-- ==============================
CREATE TABLE Categories (
                            id SERIAL PRIMARY KEY,
                            name TEXT
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
-- KoppelTABEL: Attribute_Values_Components
-- Beschrijving: Koppelt waardes van attributen aan componenten
-- ==============================
CREATE TABLE Attribute_Values_Components (
                                             attribute_value_id INT REFERENCES Attribute_Values(id),
                                             component_id INT REFERENCES Components(id),
                                             PRIMARY KEY (attribute_value_id, component_id)
);
