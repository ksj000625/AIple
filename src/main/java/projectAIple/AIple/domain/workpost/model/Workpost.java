package projectAIple.AIple.domain.workpost.model;

import com.google.cloud.Timestamp;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class Workpost {
    private String id;
    private String image;
    private String title;
    private String category;
    private String designer;
    private double price;
    private int like;
    private Timestamp create_dt;
    private Timestamp update_dt;
}
