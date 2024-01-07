package projectAIple.AIple.model;

public class Provider {

    private String name;
    /** 작가의 업무용 email
     */
    private String email;
    private String phoneNumber;
    private String company;

    /** 작가의 이름을 반환하는 getter
     * @return 작가의 이름
     */
    public String getName() {
        return name;
    }

    /** 작가의 이름을 변경하는 setter
     * @param name 변경하고자 하는 작가의 이름
     */
    public void setName(String name) {
        this.name = name;
    }

    /** 작가의 이메일을 반환하는 getter
     * @return 작가의 이메일
     */
    public String getEmail() {
        return email;
    }

    /** 작가의 이메일을 변경하는 setter
     * @param email 변경하고자 하는 작가의 이메일
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /** 작가의 전화번호를 반환하는 getter
     * @return 작가의 전화번호
     */
    public String getPhoneNumber() {
        return phoneNumber;
    }

    /** 작가의 전화번호를 변경하는 setter
     * @param phoneNumber 변경하고자 하는 작가의 전화번호
     */
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    /** 작가의 소속회사를 반환하는 getter
     * @return 작가의 소속회사
     */
    public String getCompany() {
        return company;
    }

    /** 작가의 소속회사를 변경하는 setter
     * @param company 변경하고자 하는 작가의 소속회사
     */
    public void setCompany(String company) {
        this.company = company;
    }
}
