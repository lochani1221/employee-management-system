package net.javaguides.springboot.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LoginResponse {
    private String message;
    private String role;
    private Long employeeId;
    private Long departmentId;
    private String username;

    // constructor for admin login (no employeeId or departmentId)
    public LoginResponse(String message, String role) {
        this.message = message;
        this.role = role;
    }
}
