package net.javaguides.springboot.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "employees")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name")
    private  String firstName;

    @Column(name= "last_name")
    private  String lastName;

    @Column(name = "email_id")
    private  String emailId;

//    @ManyToOne
//    @JoinColumn(name = "department_id") // This will create the foreign key in "employees" table
//    private Department department;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "department_id")
    @JsonIgnoreProperties("employees")
    private Department department;

    @Column(name = "address")
    private  String address;

    @Column(name = "gender")
    private  String gender;

    @Column(name = "appointed_date")
    private  String appointed_date;

    @Column(name = "status")
    private  String status;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role;  // e.g., ROLE_HR, ROLE_MANAGER, ROLE_EMPLOYEE
}
