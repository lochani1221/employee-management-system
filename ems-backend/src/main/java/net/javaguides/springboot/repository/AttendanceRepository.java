package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Attendance;
import net.javaguides.springboot.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AttendanceRepository extends JpaRepository<Attendance, Long> {
    List<Attendance> findByEmployee(Employee employee);
    List<Attendance> findByDepartmentId(Long departmentId);
}
