package projectAIple.AIple.service;

import projectAIple.AIple.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    List<User> getUsers();

    String insertUser(User user) throws Exception;

    Optional<User> getUserDetail(String email) throws Exception;

    String updateUser(User user) throws Exception;

    String deleteUser(String id) throws Exception;
}