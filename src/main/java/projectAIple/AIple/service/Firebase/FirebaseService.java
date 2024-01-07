package projectAIple.AIple.service.Firebase;

import org.springframework.stereotype.Service;
import projectAIple.AIple.model.User;

@Service
public interface FirebaseService {
    String insertUser(User user) throws Exception;

    User getUserDetail(String id) throws Exception;

    String updateUser(User user) throws Exception;

    String deleteUser(String id) throws Exception;
}
