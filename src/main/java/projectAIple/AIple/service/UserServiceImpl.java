package projectAIple.AIple.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import projectAIple.AIple.domain.User;
import projectAIple.AIple.repository.UserRepository;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<User> getUsers() {
        try {
            return userRepository.getAllUsers();
        } catch (Exception e) {
            log.error("UserRepository getUsers exception");
            return Collections.EMPTY_LIST;
        }
    }
}
