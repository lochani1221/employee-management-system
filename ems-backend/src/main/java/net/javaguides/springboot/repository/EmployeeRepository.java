package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Department;
import net.javaguides.springboot.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {

    // Get all employees in a department using department id
    List<Employee> findByDepartmentId(Long departmentId);

    // Get all employees in a department using the Department object
    List<Employee> findByDepartment(Department department);

    // Count employees in a specific department
    long countByDepartment(Department department);

    boolean existsByUsername(String username);

    Optional<Employee> findByUsername(String username);



}
