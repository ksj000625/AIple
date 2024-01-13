package projectAIple.AIple.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import projectAIple.AIple.model.User;
import projectAIple.AIple.repository.UserRepository;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

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

    @Override
    public String insertUser(User user) throws Exception {
        userRepository.addUser(user);
        return user.getId();
    }

    @Override
    public Optional<User> getUserDetail(String email) throws Exception {
        return userRepository.findUserByEmail(email);
    }

    @Override
    public String updateUser(User user) throws Exception {
        userRepository.editUser(user);
        return "user Data Updated";
    }

    @Override
    public String deleteUser(String email) throws Exception {
        userRepository.removeUserByEmail(email);
        return "user : "+ email +" deleted";
    }
}
