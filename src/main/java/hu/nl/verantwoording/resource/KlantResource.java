package hu.nl.verantwoording.resource;

import hu.nl.verantwoording.data.DatabaseConfig;
import hu.nl.verantwoording.model.Klant;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Path("/customers")
@Produces(MediaType.APPLICATION_JSON)
public class KlantResource {

    @GET
    public List<Klant> getAllCustomers() throws SQLException {
        List<Klant> customers = new ArrayList<>();
        String sql = "SELECT id, first_name, last_name, email FROM customers";

        try (Connection conn = DatabaseConfig.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Klant klant = new Klant(
                        rs.getInt("id"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("email")
                );
                customers.add(klant);
            }
        }
        return customers;
    }
}