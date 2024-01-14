package projectAIple.AIple.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectAIple.AIple.model.User;
import projectAIple.AIple.service.UserService;

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

    @ResponseBody
    @PostMapping("/signUpUser")
    public String insertMember(@RequestBody User user) throws Exception{
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
