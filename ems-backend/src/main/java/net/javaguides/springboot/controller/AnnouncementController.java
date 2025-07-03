package net.javaguides.springboot.controller;

import net.javaguides.springboot.model.Announcement;
import net.javaguides.springboot.model.Department;
import net.javaguides.springboot.repository.AnnouncementRepository;
import net.javaguides.springboot.repository.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/announcements")
public class AnnouncementController {

    @Autowired
    private AnnouncementRepository announcementRepo;

    @Autowired
    private DepartmentRepository departmentRepo;

    // ➕ Post new announcement
    @PostMapping
    public Announcement postAnnouncement(@RequestParam String message, @RequestParam Long departmentId) {
        Department dept = departmentRepo.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        Announcement ann = new Announcement(null, message, LocalDateTime.now(), dept);
        return announcementRepo.save(ann);
    }

    // 📄 Get announcements from last month by department
    @GetMapping("/department/{departmentId}")
    public List<Announcement> getRecentAnnouncements(@PathVariable Long departmentId) {
        LocalDateTime oneMonthAgo = LocalDateTime.now().minusMonths(1);
        Department dept = departmentRepo.findById(departmentId)
                .orElseThrow(() -> new RuntimeException("Department not found"));
        return announcementRepo.findByDepartmentAndCreatedAtAfter(dept, oneMonthAgo);
    }
}
