package projectAIple.AIple.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import projectAIple.AIple.model.User;
import projectAIple.AIple.service.Firebase.FirebaseService;

@org.springframework.web.bind.annotation.RestController
public class UserController {

    @Autowired
    FirebaseService firebaseService;

    @GetMapping("/insertUser")
    public String insertMember(@RequestParam User user) throws Exception{
        return firebaseService.insertUser(user);
    }

    @GetMapping("/getUserDetail")
    public User getMemberDetail(@RequestParam String id) throws Exception{
        return firebaseService.getUserDetail(id);
    }

    @GetMapping("/updateUser")
    public String updateMember(@RequestParam User user) throws Exception{
        return firebaseService.updateUser(user);
    }

    @GetMapping("/deleteUser")
    public String deleteMember(@RequestParam String id) throws Exception{
        return firebaseService.deleteUser(id);
    }
}
