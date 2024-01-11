package projectAIple.AIple.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projectAIple.AIple.domain.User;
import projectAIple.AIple.service.UserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    @GetMapping("/all")
    public ResponseEntity<Object> getUsers() {
        List<User> list = userService.getUsers();
        return ResponseEntity.ok().body(list);

    }
}