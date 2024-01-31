package projectAIple.AIple.domain.workpost.model;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@Data
public class Like {
    private String id;
    private String userId;
    private String workpostId;
}
