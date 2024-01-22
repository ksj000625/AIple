package projectAIple.AIple.message.request;

import lombok.Data;

@Data
public class RegisterInfo {
    private String email;
    private String password;
    private String name;
    private String nickname;

}
