-- Basis testdata
INSERT INTO customers (first_name, last_name, email) VALUES
                                                         ('Jan', 'Jansen', 'jan@voorbeeld.nl'),
                                                         ('Piet', 'Pietersen', 'piet@voorbeeld.nl'),
                                                         ('Klaas', 'Klaassen', 'klaas@voorbeeld.nl');

-- Voor orders (als je die nodig hebt)
INSERT INTO orders (customer_id, order_date, status) VALUES
                                                         (1, '2024-01-15', 1),
                                                         (2, '2024-01-16', 2);