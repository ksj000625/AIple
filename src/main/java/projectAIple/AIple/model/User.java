package projectAIple.AIple.model;

import com.google.cloud.Timestamp;
import lombok.*;

/** 유저를 나타내는 클래스
 * @author Seongjin Kim
 */
@Setter
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class User {

    private String id;
    /**
     * -- GETTER --
     * 유저의 이메일을 반환하는 getter
     * -- SETTER --
     * 유저의 이메일을 변경하는 setter
     *
     */
    private String email;
    /**
     * -- GETTER --
     * 유저의 닉네임을 반환하는 getter
     * -- SETTER --
     * 유저의 닉네임을 변경하는 setter
     *
     @return 유저의 닉네임
      * @param nickname 변경하고자 하는 유저의 닉네임
     */
    private String nickname;
    /**
     * -- GETTER --
     * 유저의 비밀번호를 반환하는 getter
     * -- SETTER --
     * 유저의 닉네임을 변경하는 setter
     */
    private String password;
    /**
     * -- SETTER --
     * 유저의 snsID를 변경하는 setter
     * -- GETTER --
     * 유저의 snsID를 반환하는 getter
     */
    private String snsID;
    private Timestamp create_dt;
    private Timestamp update_dt;

//    /** 이메일, 닉네임, 비밀번호를 가지고 user를 생성함
//     * @param email 유저의 이메일
//     * @param nickname 유저의 닉네임
//     * @param password 유저의 비밀번호
//     */
//    public User(String email, String nickname, String password) {
//        this.email = email;
//        this.nickname = nickname;
//        this.password = password;
//    }

}
