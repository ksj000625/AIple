package projectAIple.AIple.domain.workpost.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import projectAIple.AIple.domain.workpost.message.request.WorkpostInfo;
import projectAIple.AIple.domain.workpost.model.Like;
import projectAIple.AIple.domain.workpost.model.Workpost;
import projectAIple.AIple.domain.workpost.service.WorkpostService;

import java.io.*;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/workpost")
public class WorkpostController {
    private final WorkpostService workpostService;

    /**
     * 모든 외주 게시글의 list를 받아와 반환해주는 메소드
     * @return 모든 외주 게시글의 list
     */
    @GetMapping("/all")
    public ResponseEntity<Object> getAllWorkposts() {
        List<Workpost> list = workpostService.getWorkpost();
        return ResponseEntity.ok().body(list);
    }

    /**
     * 검색하고자 하는 카테고리에 해당하는 게시글의 list를 받아와 반환해주는 메소드
     * @param category 검색할 카테고리 String
     * @return 해당 카테고리에 해당하는 외주 게시글의 list
     */
    @GetMapping("/category")
    public ResponseEntity<Object> getCategoryWorkposts(@RequestBody String category) {
        List<Workpost> list = workpostService.getCategoryWorkpost(category);
        return ResponseEntity.ok().body(list);
    }

    /**
     * 검색하고자 하는 제목이 포함되는 게시글의 list를 받아와 반환해주는 메소드
     * @param title 검색할 제목 String
     * @return 해당 카테고리에 해당하는 외주 게시글의 list
     */
    @GetMapping("/title")
    public ResponseEntity<Object> getWorkpostsByTitle(@RequestBody String title) {
        List<Workpost> list = workpostService.getWorkpostByTitle(title);
        return ResponseEntity.ok().body(list);
    }

    /**
     * 외주 게시글을 추가하는 메소드
     * @param req 외주 게시글의 정보를 담은 json 정보
     * @return 성공했는지 실패했는지 확인하기 위한 짧은 string
     */
    @PostMapping("/post")
    public String addWorkpost(@RequestBody WorkpostInfo req) throws IOException {
        Workpost workpost = new Workpost();
        workpost.setTitle(req.getTitle());
        workpost.setCategory(req.getCategory());
        workpost.setDesignerId(req.getDesignerId());
        workpost.setMinPrice(req.getMinPrice());
        workpost.setNumLike(0);

        req.setImage(URLDecoder.decode(req.getImage(), StandardCharsets.UTF_8));

        // Base64 인코딩된 바이너리 데이터를 읽어들입니다.
        InputStream inputStream = new ByteArrayInputStream(req.getImage().split(",")[1].getBytes());

        // 바이너리 데이터를 이미지로 변환합니다.
        BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream));
        byte[] imageBytes = new byte[reader.readLine().length()];

        if(workpostService.addWorkpost(workpost, imageBytes)) {
            return "success!";
        } else {
            return "failed!";
        }
    }

    /**
     * 외주 게시글을 삭제하는 메소드
     * @param workpostId 삭제할 외주 게시글의 고유 Id
     * @return 성공했는지 실패했는지 확인하기 위한 짧은 string
     */
    @DeleteMapping("/delete")
    public String deleteWorkpost(@RequestBody String workpostId) {
        if(workpostService.deleteWorkpost(workpostId)) {
            return "success!";
        } else {
            return "failed!";
        }
    }

    /**
     * 외주 게시글의 내용을 변경하는 메소드
     * @param req 변경내용이 포함된 외주 게시글 정보
     * @return 성공했는지 실패했는지 확인하기 위한 짧은 string
     */
    @PostMapping("/edit")
    public String editWorkpost(@RequestBody WorkpostInfo req) {
        Workpost workpost = new Workpost();
        workpost.setId(req.getId());
        workpost.setTitle(req.getTitle());
        workpost.setCategory(req.getCategory());
        workpost.setDesignerId(req.getDesignerId());
        workpost.setMinPrice(req.getMinPrice());
        workpost.setNumLike(req.getNumLike());
        workpost.setImage(req.getImage());

        if(workpostService.editWorkpost(workpost)) {
            return "success!";
        } else {
            return "failed!";
        }
    }

    /**
     * 좋아요를 누르는 메소드
     * @param req 좋아요를 누를 외주 게시글의 정보랑 좋아요 누른 userId가 포함된 데이터
     * @return 성공했는지 실패했는지 확인하기 위한 짧은 string
     */
    @PostMapping("/like")
    public String like(@RequestBody WorkpostInfo req) {
        Workpost workpost = new Workpost();
        workpost.setId(req.getId());
        workpost.setTitle(req.getTitle());
        workpost.setCategory(req.getCategory());
        workpost.setDesignerId(req.getDesignerId());
        workpost.setMinPrice(req.getMinPrice());
        workpost.setNumLike(req.getNumLike());
        workpost.setImage(req.getImage());

        Like like = new Like();
        like.setUserId(req.getUserId());
        like.setWorkpostId(workpost.getId());

        return workpostService.likeWorkpost(like, workpost);
    }

    /**
     * 좋아요 취소하는 메소드
     * @param req 좋아요를 취소할 외주 게시글의 정보랑 좋아요를 취소한 userId가 포함된 데이터
     * @return 성공했는지 실패했는지 확인하기 위한 짧은 string
     */
    @PostMapping("/dislike")
    public String dislike(@RequestBody WorkpostInfo req) {
        Workpost workpost = new Workpost();
        workpost.setId(req.getId());
        workpost.setTitle(req.getTitle());
        workpost.setCategory(req.getCategory());
        workpost.setDesignerId(req.getDesignerId());
        workpost.setMinPrice(req.getMinPrice());
        workpost.setNumLike(req.getNumLike());
        workpost.setImage(req.getImage());

        Like like = new Like();
        like.setUserId(req.getUserId());
        like.setWorkpostId(workpost.getId());

        return workpostService.dislikeWorkpost(like, workpost);
    }
}
