package projectAIple.AIple.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import projectAIple.AIple.domain.user.repository.UserRepository;
import projectAIple.AIple.domain.user.service.CustomUserService;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {
    private final UserRepository userRepository;

    public FirebaseConfig(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Bean
    public CustomUserService customUserService() {
        return new CustomUserService(userRepository);
    }

    @Bean
    public FirebaseAuth firebaseAuth() throws IOException {
        FileInputStream serviceAccount = new FileInputStream("src/main/resources/aiple-firebase-key.json");

        FirebaseOptions.Builder optionBuilder = FirebaseOptions.builder();
        FirebaseOptions options = optionBuilder
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .build();
        FirebaseApp.initializeApp(options);

        return FirebaseAuth.getInstance(FirebaseApp.getInstance());
    }



}
