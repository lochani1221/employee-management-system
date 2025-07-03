package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Employee;
import net.javaguides.springboot.model.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
    List<LeaveRequest> findByEmployeeId(Long employeeId);
    List<LeaveRequest> findByEmployeeIn(List<Employee> employees);
    List<LeaveRequest> findByEmployeeDepartmentId(Long departmentId);


}
