package projectAIple.AIple.repository;

import com.google.cloud.Timestamp;
import lombok.extern.slf4j.Slf4j;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import projectAIple.AIple.domain.user.model.User;
import projectAIple.AIple.domain.user.repository.UserRepository;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.junit.jupiter.api.Assertions.assertEquals;

@Slf4j
@SpringBootTest
class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;

    @Test
    void getAllUsers() throws Exception {
        List<User> users = userRepository.getAllUsers();
        users.forEach(user -> System.out.println("user = " + user));
    }

    @Test
    void addUser() throws Exception {
        User user = User.builder()
                .nickname("bbb")
                .email("bbb@gmail.com")
                .create_dt(Timestamp.now())
                .build();

        userRepository.addUser(user);
    }

    @Test
    void fail_addUser() throws Exception {
        User user = User.builder()
                .nickname("Choi")
                .email("choi@gmail.com")
                .create_dt(Timestamp.now())
                .build();

        assertThatThrownBy(() -> userRepository.addUser(user))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    void editUser() throws Exception {
        User user = User.builder()
                .id("lwXZ6ZN1GXc7zudOc5y3")
                .nickname("Aaron")
                .email("bbb@gmail.com")
                .create_dt(Timestamp.now())
                .build();

        userRepository.editUser(user);
    }

    @Test
    void fail_editUser() throws Exception {
        User user = User.builder()
                .id("yXMhDPpulEWGqO3ERzEU")
                .nickname("Aaron")
                .email("abcdefg@gmail.com")
                .create_dt(Timestamp.now())
                .build();

        assertThatThrownBy(() -> userRepository.editUser(user))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    void findUserByEmail() throws Exception {
        String email = "choi@gmail.com";

        Optional<User> userOptional = userRepository.findUserByEmail(email);

        User user = userOptional.get();

        assertEquals("Choi", user.getNickname());
        assertEquals(email, user.getEmail());
    }

    @Test
    void fail_findUser() throws Exception {
        String email = "abcdefg@gmail.com";
        Optional<User> userOptional = userRepository.findUserByEmail(email);
        Assertions.assertTrue(userOptional.isEmpty());
    }

    @Test
    void removeUserByEmail() throws Exception {
        String email = "bbb@gmail.com";
        userRepository.removeUserByEmail(email);
    }

    @Test
    void fail_removeUserByEmail() throws Exception {
        String email = "abcdefg@gmail.com";

        assertThatThrownBy(() -> userRepository.removeUserByEmail(email))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    void countAllUsers() throws Exception {
        long count = userRepository.countAllUsers();
        log.info("count users: {}", count);
    }
}