package hu.nl.verantwoording.data;

import hu.nl.verantwoording.domain.Customer;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

public class DatabaseConfig {
    // Database configuratie
    private static final String DB_URL = "jdbc:postgresql://localhost:5432/postgres";
    private static final String DB_USER = "postgres";
    private static final String DB_PASSWORD = "amine";

    static {
        try {
            // Registreer de JDBC driver expliciet
            Class.forName("org.postgresql.Driver");
            System.out.println("PostgreSQL JDBC Driver succesvol geregistreerd");
        } catch (ClassNotFoundException e) {
            System.err.println("Fout bij het registreren van PostgreSQL JDBC Driver");
            throw new RuntimeException("PostgreSQL driver niet gevonden", e);
        }
    }

    public static Connection getConnection() throws SQLException {
        Properties connectionProps = new Properties();
        connectionProps.put("user", DB_USER);
        connectionProps.put("password", DB_PASSWORD);
        connectionProps.put("ssl", "false");
        connectionProps.put("sslmode", "disable");

        try {
            Connection conn = DriverManager.getConnection(DB_URL, connectionProps);
            System.out.println("Databaseverbinding succesvol");
            return conn;
        } catch (SQLException e) {
            System.err.println("Databaseverbinding mislukt: " + e.getMessage());
            throw e;
        }
    }

    public static List<Customer> getAllCustomers() throws SQLException {
        List<Customer> customers = new ArrayList<>();
        String sql = "SELECT id, name, email FROM customers";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                customers.add(new Customer(
                        rs.getInt("id"),
                        rs.getString("first_name"),
                        rs.getString("last_name"),
                        rs.getString("email")
                ));
            }
        }
        return customers;
    }

    // Testmethode voor lokale verificatie
    public static void main(String[] args) {
        try {
            Connection conn = getConnection();
            if (conn != null) {
                System.out.println("Databaseverbinding werkt!");
                conn.close();

                // Test data ophalen
                List<Customer> customers = getAllCustomers();
                System.out.println("Aantal klanten: " + customers.size());
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}