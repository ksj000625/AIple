package projectAIple.AIple.domain.workpost.model;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class Like {
    @Id
    private String id;
    @Column
    private String userId;
    @Column
    private String workpostId;
}
