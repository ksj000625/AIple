package projectAIple.AIple.domain.user.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;
import projectAIple.AIple.domain.user.model.CustomUser;
import projectAIple.AIple.domain.user.service.CustomUserService;
import projectAIple.AIple.domain.user.message.request.DesignerRegInfo;
import projectAIple.AIple.domain.user.message.request.RegisterInfo;
import projectAIple.AIple.domain.user.message.response.UserInfo;
import projectAIple.AIple.domain.user.util.RequestUtil;

import lombok.extern.slf4j.Slf4j;

import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final FirebaseAuth firebaseAuth;

    private final CustomUserService customUserDetailsService;

    @Autowired
    public UserController(CustomUserService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
        firebaseAuth = FirebaseAuth.getInstance();
    }

    @PostMapping("/signUpGoogle")
    public UserInfo register(@RequestHeader("Authorization") String authorization,
                             @RequestBody RegisterInfo registerInfo) {
        // TOKEN을 가져온다.
        FirebaseToken decodedToken;

        log.info(authorization);
        log.info(registerInfo.getNickname());

        try {
            String token = RequestUtil.getAuthorizationToken(authorization);
            decodedToken = firebaseAuth.verifyIdToken(token);
        } catch (IllegalArgumentException | FirebaseAuthException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "{\"code\":\"INVALID_TOKEN\", \"message\":\"" + e.getMessage() + "\"}");
        }
        // 사용자를 등록한다.
        CustomUser registeredUser = customUserDetailsService.register(
                decodedToken.getUid(), decodedToken.getEmail(), registerInfo.getNickname());
        return new UserInfo(registeredUser);
    }

    @PostMapping("/signUpEmail/Client")
    public void register(
            @RequestBody RegisterInfo request
    ) throws FirebaseAuthException {
        String email = request.getEmail();
        String password = request.getPassword();
        String nickname = request.getNickname();

        UserRecord.CreateRequest record = new UserRecord.CreateRequest()
                .setEmail(email)
                .setPassword(password)
                .setDisplayName(nickname)
                // 필요에 따라 다른 속성 설정
                ;

        UserRecord user = firebaseAuth.createUser(record);

        log.info(String.valueOf(user));

        // return new UserInfo(user);
    }

    @PostMapping("/signUpEmail/Designer")
    public void register(
            @RequestBody DesignerRegInfo request
    ) throws FirebaseAuthException {
        String email = request.getEmail();
        String password = request.getPassword();
        String nickname = request.getNickname();
        String businessEmail = request.getBusinessEmail();
        String team = request.getTeam();
        String phoneNumber = request.getPhoneNumber();
        String name = request.getName();

        UserRecord.CreateRequest record = new UserRecord.CreateRequest()
                .setEmail(email)
                .setPassword(password)
                .setDisplayName(nickname)
                .setPhoneNumber(phoneNumber)
                // 필요에 따라 다른 속성 설정
                ;

        UserRecord user = firebaseAuth.createUser(record);

        log.info(user.getUid());
        // return new UserInfo(user);
    }

    @GetMapping("/me")
    public UserInfo getUserMe(@RequestHeader("Authorization") String authorization) {
        // TOKEN을 가져온다.
        FirebaseToken decodedToken;

        try {
            String token = RequestUtil.getAuthorizationToken(authorization);
            decodedToken = firebaseAuth.verifyIdToken(token);
        } catch (IllegalArgumentException | FirebaseAuthException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "{\"code\":\"INVALID_TOKEN\", \"message\":\"" + e.getMessage() + "\"}");
        }
        // 사용자를 등록한다.

        CustomUser customUser = new CustomUser();
        customUser.setUsername(decodedToken.getUid());
        customUser.setEmail(decodedToken.getEmail());
        customUser.setNickname(decodedToken.getName());

        log.info(String.valueOf(new UserInfo(customUser)));

//        CustomUser customUser = ((CustomUser) authentication.getPrincipal());
        return new UserInfo(customUser);
    }

    @PostMapping("/me/profileImage")
    public CustomUser updateProfile(@RequestBody MultipartFile image,
                                    Authentication authentication) throws IOException {
        CustomUser user = (CustomUser) authentication.getPrincipal();
        log.info("user: {}", user);
        return customUserDetailsService.updateProfile(user, image.getBytes());
    }

    @GetMapping("/users/{uid}/profile")
    public byte[] downloadProfile(@PathVariable String uid) {
        return customUserDetailsService.getProfile(uid);
    }
}