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

        try (Connection conn = DatabaseConfig.getConnection();
             PreparedStatement klantStmt = conn.prepareStatement(klantQuery)) {

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

                try (PreparedStatement userStmt = conn.prepareStatement(userQuery)) {
                    userStmt.setInt(1, klantId);
                    userStmt.setString(2, klant.getEmail());
                    userStmt.setString(3, klant.getPassword());
                    userStmt.executeUpdate();
                }

                return true;
            }
        } catch (SQLException e) {
            LOGGER.severe("Fout bij registratie: " + e.getMessage());
        }

        return false;
    }
}