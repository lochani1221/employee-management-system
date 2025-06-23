package net.javaguides.springboot.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    // Optional: To get all employees in a department
    @OneToMany(mappedBy = "department", cascade = CascadeType.ALL)
    @JsonIgnoreProperties("department")  // prevent circular reference on other side too
    private List<Employee> employees;



}
