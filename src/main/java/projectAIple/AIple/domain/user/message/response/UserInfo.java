package projectAIple.AIple.domain.user.message.response;

import lombok.Data;
import projectAIple.AIple.domain.user.model.CustomUser;

@Data
public class UserInfo {
    private String uid;
    private String email;
    private String nickname;

    public UserInfo(CustomUser customUser) {
        this.uid = customUser.getUsername();
        this.email = customUser.getEmail();
        this.nickname = customUser.getNickname();
    }
}
