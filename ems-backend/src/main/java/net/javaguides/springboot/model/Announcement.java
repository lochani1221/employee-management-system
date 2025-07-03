package net.javaguides.springboot.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Announcement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String message;

    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "department_id")
    private Department department;
}
