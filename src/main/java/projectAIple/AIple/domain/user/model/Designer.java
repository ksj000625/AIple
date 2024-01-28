package projectAIple.AIple.domain.user.model;

import com.google.cloud.Timestamp;
import lombok.*;

@Setter
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class Designer {
    private String id;
    private String email;
    private String name;
    private String businessEmail;
    private String phoneNumber;
    private String company;
    private Timestamp create_dt;
    private Timestamp update_dt;
}
