package hu.nl.verantwoording.data;

import hu.nl.verantwoording.model.Klant;

import java.sql.*;
import java.util.logging.Logger;

public class RegistratieDAO {
    private static final Logger LOGGER = Logger.getLogger(RegistratieDAO.class.getName());

    public boolean voegKlantToe(Klant klant) {
        String klantQuery = """
            INSERT INTO Customers
            (first_name, last_name, email, date_of_birth, phone_number, address, city, state, postal_code, country)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            RETURNING id
        """;

        String userQuery = """
            INSERT INTO Users
            (customer_id, email, password)
            VALUES (?, ?, ?)
        """;

        try (Connection conn = DatabaseConfig.getConnection()) {
            conn.setAutoCommit(false); // Zet transactie aan

            try (
                    PreparedStatement klantStmt = conn.prepareStatement(klantQuery);
            ) {
                klantStmt.setString(1, klant.getFirstName());
                klantStmt.setString(2, klant.getLastName());
                klantStmt.setString(3, klant.getEmail());
                klantStmt.setObject(4, klant.getDateOfBirth() != null ? Date.valueOf(klant.getDateOfBirth()) : null);
                klantStmt.setString(5, klant.getPhoneNumber());
                klantStmt.setString(6, klant.getAddress());
                klantStmt.setString(7, klant.getCity());
                klantStmt.setString(8, klant.getState());
                klantStmt.setString(9, klant.getPostalCode());
                klantStmt.setString(10, klant.getCountry());

                ResultSet rs = klantStmt.executeQuery();

                if (rs.next()) {
                    int klantId = rs.getInt("id");
                    LOGGER.info("Klant toegevoegd met ID: " + klantId);

                    try (PreparedStatement userStmt = conn.prepareStatement(userQuery)) {
                        userStmt.setInt(1, klantId);
                        userStmt.setString(2, klant.getEmail());
                        userStmt.setString(3, klant.getPassword()); // eventueel: hash wachtwoord
                        userStmt.executeUpdate();
                    }

                    conn.commit(); // Alles ok, commit
                    return true;
                } else {
                    LOGGER.warning("Geen klant-ID teruggekregen.");
                    conn.rollback();
                    return false;
                }

            } catch (SQLException e) {
                LOGGER.severe("Fout tijdens registratie. Rolling back.");
                conn.rollback();
                e.printStackTrace();
                return false;
            } finally {
                conn.setAutoCommit(true); // Herstel standaardinstelling
            }

        } catch (SQLException e) {
            LOGGER.severe("Databaseverbindingsfout.");
            e.printStackTrace();
            return false;
        }
    }
}
