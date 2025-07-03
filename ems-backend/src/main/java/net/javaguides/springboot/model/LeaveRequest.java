package net.javaguides.springboot.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    private String reason;

    private LocalDate startDate;

    private LocalDate endDate;

    private String status; // Pending, Approved, Rejected
}
