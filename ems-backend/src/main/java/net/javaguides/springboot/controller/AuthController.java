package net.javaguides.springboot.controller;

import net.javaguides.springboot.dto.LoginRequest;
import net.javaguides.springboot.model.User;
import net.javaguides.springboot.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        return userRepository.findByUsername(request.getUsername())
                .map(user -> {
                    if (user.getPassword().equals(request.getPassword())) {
                        return ResponseEntity.ok("✅ Login successful");
                    } else {
                        return ResponseEntity.status(401).body("❌ Incorrect password");
                    }
                })
                .orElse(ResponseEntity.status(404).body("❌ User not found"));
    }
}
