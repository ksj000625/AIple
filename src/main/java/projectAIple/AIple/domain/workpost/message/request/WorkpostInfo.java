package projectAIple.AIple.domain.workpost.message.request;

import lombok.Data;

@Data
public class WorkpostInfo {
    private String id;
    private String image;
    private String title;
    private String category;
    private String designerId;
    private double minPrice;
    private int numLike;

    // 좋아요를 누르거나 취소하는 경우만 해당
    private String userId;
}
