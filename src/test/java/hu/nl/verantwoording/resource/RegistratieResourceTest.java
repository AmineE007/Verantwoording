package hu.nl.verantwoording.resource;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class RegistratieResourceTest {

    @Test
    void testTestEndpoint() {
        RegistratieResource resource = new RegistratieResource();
        String result = resource.testEndpoint();
        assertEquals("Registratie-endpoint werkt. Gebruik POST om een klant te registreren.", result);
    }
}

