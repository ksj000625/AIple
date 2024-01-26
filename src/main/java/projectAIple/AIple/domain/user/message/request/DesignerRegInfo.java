package projectAIple.AIple.domain.user.message.request;

import lombok.Data;

@Data
public class DesignerRegInfo {
    private String email;
    private String password;
    private String name;
    private String nickname;

    private String businessEmail;
    private String team;
    private String phoneNumber;
}
