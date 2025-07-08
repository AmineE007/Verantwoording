package hu.nl.verantwoording.resource;

import hu.nl.verantwoording.model.Customer;
import hu.nl.verantwoording.data.DatabaseConfig;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Path("/customers")
@Produces(MediaType.APPLICATION_JSON)
public class CustomerResource {

    @GET
    public List<Customer> getAllCustomers() throws SQLException {
        List<Customer> customers = new ArrayList<>();
        String sql = "SELECT ID, First_name, Last_name, email FROM customers";

        try (Connection conn = DatabaseConfig.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                customers.add(new Customer(
                        rs.getInt("id"),
                        rs.getString("First_name"),
                        rs.getString("Last_name"),
                        rs.getString("email")
                ));
            }
        }
        return customers;
    }
}