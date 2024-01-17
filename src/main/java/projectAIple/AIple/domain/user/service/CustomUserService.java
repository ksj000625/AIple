package projectAIple.AIple.domain.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import projectAIple.AIple.domain.user.model.CustomUser;
import projectAIple.AIple.domain.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;

import java.util.Optional;

@Slf4j
@Service
public class CustomUserService implements UserDetailsService {
//    @Autowired
    private final UserRepository userRepository;

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
}