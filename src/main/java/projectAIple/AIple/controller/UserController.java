package projectAIple.AIple.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import projectAIple.AIple.model.User;
import projectAIple.AIple.service.UserService;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/insertUser")
    public String insertMember(@RequestParam User user) throws Exception{
        return userService.insertUser(user);
    }

    @GetMapping("/getUserDetail")
    public Optional<User> getUserDetail(@RequestParam String email) throws Exception{
        return userService.getUserDetail(email);
    }

    @GetMapping("/updateUser")
    public String updateUser(@RequestParam User user) throws Exception{
        return userService.updateUser(user);
    }

    @GetMapping("/deleteUser")
    public String deleteUser(@RequestParam String email) throws Exception{
        return userService.deleteUser(email);
    }
}
