package net.javaguides.springboot.controller;

import net.javaguides.springboot.dto.DepartmentEmployeeCountDTO;
import net.javaguides.springboot.exception.ResourceNotFoundExeption;
import net.javaguides.springboot.model.Department;
import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.repository.DepartmentRepository;
import net.javaguides.springboot.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/V1/employees")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private DepartmentRepository departmentRepository;

    // 🔹 Get all employees
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // 🔹 Create a new employee
    @PostMapping
    public ResponseEntity<Employee> createEmployee(@RequestBody Employee employee) {
        if (employee.getDepartment() != null && employee.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(employee.getDepartment().getId())
                    .orElseThrow(() -> new ResourceNotFoundExeption("Department not found with id: " + employee.getDepartment().getId()));
            employee.setDepartment(dept);
        } else {
            employee.setDepartment(null);
        }

        Employee savedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(savedEmployee);
    }

    // 🔹 Get employee by ID
    @GetMapping("{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable("id") long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundExeption("Employee not exist with Id: " + id));
        return ResponseEntity.ok(employee);
    }

    // 🔹 Update employee by ID (used by Admin/HR)
    @PutMapping("{id}")
    public ResponseEntity<Employee> updateEmployee(@PathVariable long id, @RequestBody Employee employeeDetails) {
        Employee updateEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundExeption("Employee not exist with id: " + id));

        updateEmployee.setFirstName(employeeDetails.getFirstName());
        updateEmployee.setLastName(employeeDetails.getLastName());
        updateEmployee.setEmailId(employeeDetails.getEmailId());

        if (employeeDetails.getDepartment() != null && employeeDetails.getDepartment().getId() != null) {
            Department dept = departmentRepository.findById(employeeDetails.getDepartment().getId())
                    .orElseThrow(() -> new ResourceNotFoundExeption("Department not found with id: " + employeeDetails.getDepartment().getId()));
            updateEmployee.setDepartment(dept);
        } else {
            updateEmployee.setDepartment(null);
        }

        updateEmployee.setAddress(employeeDetails.getAddress());
        updateEmployee.setGender(employeeDetails.getGender());
        updateEmployee.setAppointed_date(employeeDetails.getAppointed_date());
        updateEmployee.setStatus(employeeDetails.getStatus());

        employeeRepository.save(updateEmployee);

        return ResponseEntity.ok(updateEmployee);
    }

    // 🔹 Delete employee
    @DeleteMapping("{id}")
    public ResponseEntity<Void> deleteEmployee(@PathVariable long id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundExeption("Employee not exist with id: " + id));

        employeeRepository.delete(employee);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // 🔹 Get employees by department
    @GetMapping("/department/id/{id}")
    public ResponseEntity<List<Employee>> getEmployeesByDepartmentId(@PathVariable Long id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundExeption("Department not found with id: " + id));

        List<Employee> employees = employeeRepository.findByDepartment(department);
        return ResponseEntity.ok(employees);
    }

    // 🔹 Get employee count per department
    @GetMapping("/department-counts")
    public List<DepartmentEmployeeCountDTO> getEmployeeCountPerDepartment() {
        List<Department> departments = departmentRepository.findAll();
        List<DepartmentEmployeeCountDTO> result = new ArrayList<>();

        for (Department dept : departments) {
            long count = employeeRepository.countByDepartment(dept);
            result.add(new DepartmentEmployeeCountDTO(dept.getName(), count));
        }

        return result;
    }

    // ✅ 🔹 Get employee profile by username (for ROLE_EMPLOYEE)
    @GetMapping("/profile/{username}")
    public ResponseEntity<Employee> getEmployeeByUsername(@PathVariable String username) {
        Employee emp = employeeRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundExeption("Employee not found"));
        return ResponseEntity.ok(emp);
    }


    // ✅ 🔹 Update employee profile (for ROLE_EMPLOYEE)
    @PutMapping("/profile/{id}")
    public ResponseEntity<Employee> updateEmployeeProfile(@PathVariable long id, @RequestBody Employee employeeDetails) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundExeption("Employee not exist with id: " + id));

        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmailId(employeeDetails.getEmailId());
        employee.setAddress(employeeDetails.getAddress());
        employee.setGender(employeeDetails.getGender());
        employee.setStatus(employeeDetails.getStatus());

        Employee updatedEmployee = employeeRepository.save(employee);
        return ResponseEntity.ok(updatedEmployee);
    }
}
