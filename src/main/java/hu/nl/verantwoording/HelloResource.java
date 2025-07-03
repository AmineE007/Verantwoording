package hu.nl.verantwoording;

import hu.nl.verantwoording.data.DatabaseConfig;
import hu.nl.verantwoording.domain.Customer;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import java.sql.SQLException;
import java.util.List;

@Path("/hello")
public class HelloResource {

    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String hello() {
        return "Hello, World!";
    }

    @GET
    @Path("/customers")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Customer> getCustomers() throws SQLException {
        return DatabaseConfig.getAllCustomers();
    }
}