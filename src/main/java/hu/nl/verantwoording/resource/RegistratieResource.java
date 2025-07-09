package hu.nl.verantwoording.resource;

import hu.nl.verantwoording.data.RegistratieDAO;
import hu.nl.verantwoording.model.Klant;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/registratie")
public class RegistratieResource {
    private final RegistratieDAO dao = new RegistratieDAO();

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response registreerKlant(Klant klant) {
        boolean success = dao.voegKlantToe(klant);
        if (success) {
            return Response.status(Response.Status.CREATED)
                    .entity("{\"message\": \"Registratie succesvol!\"}")
                    .build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("{\"error\": \"Registratie mislukt!\"}")
                    .build();
        }
    }

    // Nieuw toegevoegd: GET /registratie
    @GET
    @Produces(MediaType.TEXT_PLAIN)
    public String testEndpoint() {
        return "Registratie-endpoint werkt. Gebruik POST om een klant te registreren.";
    }
}

