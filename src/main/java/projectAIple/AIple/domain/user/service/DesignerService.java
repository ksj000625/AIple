package projectAIple.AIple.domain.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import projectAIple.AIple.domain.user.model.Designer;
import projectAIple.AIple.domain.user.repository.DesignerRepository;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class DesignerService {

    private final DesignerRepository designerRepository;

    public List<Designer> getDesigners() {
        try {
            return designerRepository.getAllDesignersInfo();
        } catch (Exception e) {
            log.error("DesignerRepository getDesigners exception");
            return Collections.EMPTY_LIST;
        }
    }

    public String addDesigner(Designer designer) {
        try {
            designerRepository.addDesigner(designer);
            return "signIn Succeed!";
        } catch(Exception e) {
            log.error("DesignerRepository addDesigners exception");
            return "signIn Failed!";
        }
    }
}
