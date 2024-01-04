package projectAIple.AIple.domain;

/** 유저를 나타내는 클래스
 * @author Seongjin Kim
 */
public class User {

    private String email;
    private String nickname;
    private String password;
    private String snsID;

    /** 이메일, 닉네임, 비밀번호를 가지고 user를 생성함
     * @param email 유저의 이메일
     * @param nickname 유저의 닉네임
     * @param password 유저의 비밀번호
     */
    public User(String email, String nickname, String password) {
        this.email = email;
        this.nickname = nickname;
        this.password = password;
    }

    /** 유저의 이메일을 반환하는 getter
     * @return 유저의 이메일
     */
    public String getEmail() {
        return email;
    }

    /** 유저의 이메일을 변경하는 setter
     * @param email 변경하고자 하는 유저의 이메일
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /** 유저의 닉네임을 반환하는 getter
     * @return 유저의 닉네임
     */
    public String getNickname() {
        return nickname;
    }

    /** 유저의 닉네임을 변경하는 setter
     * @param nickname 변경하고자 하는 유저의 닉네임
     */
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    /** 유저의 비밀번호를 반환하는 getter
     * @return 유저의 비밀번호
     */
    public String getPassword() {
        return password;
    }

    /** 유저의 닉네임을 변경하는 setter
     * @param password 변경하고자 하는 유저의 닉네임
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /** 유저의 snsID를 반환하는 getter
     * @return 유저의 snsID
     */
    public String getSnsID() {
        return snsID;
    }

    /** 유저의 snsID를 변경하는 setter
     * @param snsID 변경하고자 하는 유저의 snsID
     */
    public void setSnsID(String snsID) {
        this.snsID = snsID;
    }
}
