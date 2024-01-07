package projectAIple.AIple.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import projectAIple.AIple.service.Firebase.FirebaseService;
import projectAIple.AIple.service.Firebase.FirebaseServiceImpl;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Bean
    public FirebaseApp initFirebase() throws IOException {
        FirebaseApp app = FirebaseApp.getInstance();

        // FirebaseApp 객체가 없으면 생성합니다.
        if (app == null) {
            FileInputStream serviceAccount = new FileInputStream("src/main/resources/aiple-firebase-key.json");
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();
            app = FirebaseApp.initializeApp(options);
        }

        return app;
    }

    @Bean
    public FirebaseService firebaseService() {
        return new FirebaseServiceImpl();
    }
}
