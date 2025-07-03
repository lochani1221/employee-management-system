package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.Attendance;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.model.Department;
import net.javaguides.springboot.repository.AttendanceRepository;
import net.javaguides.springboot.repository.EmployeeRepository;
import net.javaguides.springboot.repository.DepartmentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    /**
     * Mark attendance by employee
     */
    @PostMapping("/{employeeId}")
    public ResponseEntity<?> markAttendance(
            @PathVariable Long employeeId,
            @RequestBody Map<String, String> body) {

        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        if (employee == null) return ResponseEntity.badRequest().body("Employee not found");

        Department department = employee.getDepartment();
        if (department == null) return ResponseEntity.badRequest().body("Employee has no department");

        String timestampStr = body.get("timestamp");
        LocalDateTime timestamp = timestampStr != null ? LocalDateTime.parse(timestampStr) : LocalDateTime.now();

        Attendance attendance = new Attendance();
        attendance.setEmployee(employee);
        attendance.setDepartment(department);
        attendance.setTimestamp(timestamp);

        Attendance saved = attendanceRepository.save(attendance);
        return ResponseEntity.ok(saved);
    }


    /**
     * Get attendance by employee
     */
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<?> getAttendanceByEmployee(@PathVariable Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElse(null);
        if (employee == null) return ResponseEntity.badRequest().body("Employee not found");

        List<Attendance> attendances = attendanceRepository.findByEmployee(employee);
        return ResponseEntity.ok(attendances);
    }

    /**
     * Get all attendance for department (manager can view)
     */
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<?> getAttendanceByDepartment(@PathVariable Long departmentId) {
        List<Attendance> attendances = attendanceRepository.findByDepartmentId(departmentId);
        return ResponseEntity.ok(attendances);
    }

    // Get attendance for manager's department, optional search by employee name
    @GetMapping("/department/{departmentId}/search")
    public ResponseEntity<?> getAttendanceByDepartmentAndSearch(
            @PathVariable Long departmentId,
            @RequestParam(required = false) String name) {

        List<Attendance> attendances = attendanceRepository.findByDepartmentId(departmentId);

        if (name != null && !name.isEmpty()) {
            attendances = attendances.stream()
                    .filter(a -> {
                        String fullName = a.getEmployee().getFirstName() + " " + a.getEmployee().getLastName();
                        return fullName.toLowerCase().contains(name.toLowerCase());
                    })
                    .toList();
        }

        return ResponseEntity.ok(attendances);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateAttendance(@PathVariable Long id, @RequestBody Map<String, String> body) {
        Attendance attendance = attendanceRepository.findById(id).orElse(null);
        if (attendance == null) return ResponseEntity.badRequest().body("Attendance not found");

        String timestampStr = body.get("timestamp");
        if (timestampStr != null) {
            attendance.setTimestamp(LocalDateTime.parse(timestampStr));
        }

        Attendance updated = attendanceRepository.save(attendance);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAttendance(@PathVariable Long id) {
        Attendance attendance = attendanceRepository.findById(id).orElse(null);
        if (attendance == null) return ResponseEntity.badRequest().body("Attendance not found");

        attendanceRepository.delete(attendance);
        return ResponseEntity.ok().build();
    }


}
