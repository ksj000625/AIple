package projectAIple.AIple.domain.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import projectAIple.AIple.domain.user.model.CustomUser;

@Repository
public interface UserRepository extends JpaRepository<CustomUser, String> {
}