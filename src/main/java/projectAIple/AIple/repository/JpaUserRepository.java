package projectAIple.AIple.repository;

import jakarta.persistence.EntityManager;
import projectAIple.AIple.model.User;

import java.util.List;
import java.util.Optional;

public class JpaUserRepository implements UserRepository {

    private final EntityManager em;

    public JpaUserRepository(EntityManager em) {
        this.em = em;
    }

    @Override
    public User saveUser(User user) {
        em.persist(user);
        return user;
    }

    @Override
    public Optional<User> findUserByEmail(String email) {
        User user = em.find(User.class, email);
        return Optional.ofNullable(user);
    }

    @Override
    public Optional<User> findUserByNickname(String nickname) {
        return Optional.ofNullable(null);
    }

    @Override
    public List<User> findAllUsers() {
        return null;
    }
}
