package projectAIple.AIple.domain.user.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectAIple.AIple.domain.user.message.request.DesignerRegInfo;
import projectAIple.AIple.domain.user.model.Designer;
import projectAIple.AIple.domain.user.service.DesignerService;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/designer")
public class DesignerController {

    private final DesignerService designerService;

    @GetMapping("/all")
    public ResponseEntity<Object> getUsers() {
        List<Designer> list = designerService.getDesigners();
        return ResponseEntity.ok().body(list);
    }

    @PostMapping("/addDesigner")
    public String addDesigner(@RequestBody DesignerRegInfo req) {
        Designer designer = new Designer();
        designer.setId(req.getId());
        designer.setEmail(req.getEmail());
        designer.setName(req.getName());
        designer.setBusinessEmail(req.getBusinessEmail());
        designer.setCompany(req.getTeam());
        designer.setPhoneNumber(req.getPhoneNumber());

        log.info(designer.getPhoneNumber());

        return designerService.addDesigner(designer);
    }
}
