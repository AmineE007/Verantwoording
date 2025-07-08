package hu.nl.verantwoording.model;

public class Customer {
    private int id;
    private String firstName;
    private String lastName;
    private String email;

    // Constructor met 4 parameters
    public Customer(int id, String firstName, String lastName, String email) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
    }

    // Getters
    public int getId() { return id; }
    public String getFirstName() { return firstName; }
    public String getLastName() { return lastName; }
    public String getEmail() { return email; }
}