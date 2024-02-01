package projectAIple.AIple.domain.workpost.model;

import com.google.cloud.Timestamp;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@Data
public class Workpost {
    @Id
    private String id;
    @Column
    private String image;
    @Column
    private String title;
    @Column
    private String category;
    @Column
    private String designer;
    @Column
    private double price;
    @Column
    private int like;
    @Column
    private Timestamp create_dt;
    @Column
    private Timestamp update_dt;
}
