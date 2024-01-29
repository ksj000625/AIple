package projectAIple.AIple.domain.workpost.model;

import com.google.cloud.Timestamp;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class Workpost {
    private String id;
    private String image;
    private String name;
    private String category;
    private String designer;
    private double price;
    private int like;
    private Timestamp create_dt;
}
