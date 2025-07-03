package net.javaguides.springboot.repository;

import net.javaguides.springboot.model.Announcement;
import net.javaguides.springboot.model.Department;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;
import java.util.List;

public interface AnnouncementRepository extends JpaRepository<Announcement, Long> {
    List<Announcement> findByDepartmentAndCreatedAtAfter(Department department, LocalDateTime after);
}
