package net.javaguides.springboot.controller;

import net.javaguides.springboot.dto.LoginRequest;
import net.javaguides.springboot.dto.LoginResponse;
import net.javaguides.springboot.exception.ResourceNotFoundExeption;
import net.javaguides.springboot.model.Department;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.model.User;
import net.javaguides.springboot.repository.DepartmentRepository;
import net.javaguides.springboot.repository.EmployeeRepository;
import net.javaguides.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    // 🔐 Login for both Admin and Employee roles
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        // 1. Try admin login
        var userOpt = userRepository.findByUsername(request.getUsername());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            if (user.getPassword().equals(request.getPassword())) {
                return ResponseEntity.ok(new LoginResponse("✅ Admin login successful", "ROLE_ADMIN"));
            } else {
                return ResponseEntity.status(401).body(new LoginResponse("❌ Incorrect password", null));
            }
        }



        // 2. Try employee login
        var empOpt = employeeRepository.findByUsername(request.getUsername());
        if (empOpt.isPresent()) {
            Employee emp = empOpt.get();
            if (emp.getPassword().equals(request.getPassword())) {
                return ResponseEntity.ok(
                        new LoginResponse(
                                "✅ Employee login successful",
                                emp.getRole(),
                                emp.getId(),
                                emp.getDepartment() != null ? emp.getDepartment().getId() : null, // safely get departmentId
                                emp.getUsername()
                        )
                );
            } else {
                return ResponseEntity.status(401).body(new LoginResponse("❌ Incorrect password", null));
            }
        }

        return ResponseEntity.status(404).body(new LoginResponse("❌ User not found", null));
    }

    // 📝 Admin registers an employee (HR, Manager, etc.)
    @PostMapping("/register")
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        if (employee.getDepartment() != null && employee.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(employee.getDepartment().getId())
                    .orElseThrow(() -> new ResourceNotFoundExeption("Department not found with id: " + employee.getDepartment().getId()));
            employee.setDepartment(dept);
        } else {
            employee.setDepartment(null);
        }

        // Check if username already exists
        if (employeeRepository.existsByUsername(employee.getUsername())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(null); // or return a custom error message
        }

        Employee savedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(savedEmployee);
    }
}
