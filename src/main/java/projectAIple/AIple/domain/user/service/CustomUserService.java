package projectAIple.AIple.domain.user.service;

import com.google.cloud.storage.Bucket;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import projectAIple.AIple.domain.user.model.CustomUser;
import projectAIple.AIple.domain.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.Optional;

@Slf4j
@Service
public class CustomUserService implements UserDetailsService {
//    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private Bucket bucket;

    public CustomUserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info(String.valueOf(userRepository.count()));
//        Optional<CustomUser> userDetails = userRepository.findById(username);
//        return userDetails.orElse(null);
        return userRepository.findById(username).get();
    }

    @Transactional
    public CustomUser register(String uid, String email, String nickname) {
        CustomUser customUser = CustomUser.builder()
                .username(uid)
                .email(email)
                .nickname(nickname)
                .build();
        userRepository.save(customUser);
        return customUser;
    }

    public CustomUser updateProfile(CustomUser user, byte[] image) throws IOException {
        // File 저장 위치를 선언
        String blob = "/users/"+user.getUsername()+"/profile";
        // 이미 존재하면 파일 삭제
        if(bucket.get(blob) != null) {
            bucket.get(blob).delete();
        }
        // 파일을 Bucket에 저장
        bucket.create(blob, image);
        // DB에 유저 정보 업데이트 (Profile 이미지 위치 추가)
        user.updateProfile("/users/"+user.getUsername()+"/profile");
        userRepository.save(user);
        return user;

    }

    public byte[] getProfile(String uid) {
        return bucket.get("/users/"+uid+"/profile").getContent();
    }
}