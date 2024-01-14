package projectAIple.AIple.domain.user.controller;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import projectAIple.AIple.domain.user.model.CustomUser;
import projectAIple.AIple.domain.user.service.CustomUserService;
import projectAIple.AIple.message.request.RegisterInfo;
import projectAIple.AIple.message.response.UserInfo;
import projectAIple.AIple.util.RequestUtil;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    FirebaseAuth firebaseAuth;
    @Autowired
    private CustomUserService customUserDetailsService;

    @PostMapping("")
    public UserInfo register(@RequestHeader("Authorization") String authorization,
                             @RequestBody RegisterInfo registerInfo) {
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
        CustomUser registeredUser = customUserDetailsService.register(
                decodedToken.getUid(), decodedToken.getEmail(), registerInfo.getNickname());
        return new UserInfo(registeredUser);
    }

    @GetMapping("/me")
    public UserInfo getUserMe(Authentication authentication) {
        CustomUser customUser = ((CustomUser) authentication.getPrincipal());
        return new UserInfo(customUser);
    }
}