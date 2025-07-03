package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.model.LeaveRequest;
import net.javaguides.springboot.repository.DepartmentRepository;
import net.javaguides.springboot.repository.EmployeeRepository;
import net.javaguides.springboot.repository.LeaveRequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestRepository leaveRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    /**
     * Apply for leave
     */
    @PostMapping
    public ResponseEntity<?> applyLeave(@RequestBody LeaveRequest request) {
        if (request.getEmployee() == null || request.getEmployee().getId() == null) {
            return ResponseEntity.badRequest().body("Employee ID is required");
        }

        Employee employee = employeeRepository.findById(request.getEmployee().getId()).orElse(null);
        if (employee == null) {
            return ResponseEntity.badRequest().body("Employee not found");
        }

        request.setEmployee(employee);
        request.setStatus("Pending");
        LeaveRequest savedRequest = leaveRepository.save(request);
        return ResponseEntity.ok(savedRequest);
    }

    /**
     * Get all leaves for a specific employee
     */
    @GetMapping("/{employeeId}")
    public ResponseEntity<?> getEmployeeLeaves(@PathVariable Long employeeId) {
        List<LeaveRequest> leaves = leaveRepository.findByEmployeeId(employeeId);
        return ResponseEntity.ok(leaves);
    }

    /**
     * Get all leave requests for employees in manager's department
     * managerUsername is stored on login (localStorage)
     */
    @GetMapping("/department/{managerUsername}")
    public ResponseEntity<?> getLeavesForManagerDepartment(@PathVariable String managerUsername) {
        // Find manager by username
        Employee manager = employeeRepository.findByUsername(managerUsername).orElse(null);
        if (manager == null) return ResponseEntity.badRequest().body("Manager not found");

        if (manager.getDepartment() == null) return ResponseEntity.badRequest().body("Manager has no department");

        // Find employees in manager's department
        List<Employee> employees = employeeRepository.findByDepartment(manager.getDepartment());

        // Find leave requests of these employees
        List<LeaveRequest> leaves = leaveRepository.findByEmployeeIn(employees);
        return ResponseEntity.ok(leaves);
    }

    /**
     * Update leave status: approve/reject
     */
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateLeaveStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String status = body.get("status");
        if (status == null || (!status.equals("Approved") && !status.equals("Rejected"))) {
            return ResponseEntity.badRequest().body("Invalid status");
        }

        LeaveRequest leave = leaveRepository.findById(id).orElse(null);
        if (leave == null) {
            return ResponseEntity.badRequest().body("Leave request not found");
        }

        leave.setStatus(status);
        LeaveRequest updated = leaveRepository.save(leave);
        return ResponseEntity.ok(updated);
    }
}
