package projectAIple.AIple.repository;

import projectAIple.AIple.domain.User;

import java.util.List;
import java.util.Optional;

public interface UserRepository {
    User saveUser(User user);

    Optional<User> findUserByEmail(String email);

    Optional<User> findUserByNickname(String nickname);

    List<User> findAllUsers();
}
