package projectAIple.AIple.domain.workpost.service;

import com.google.cloud.storage.Bucket;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import projectAIple.AIple.domain.workpost.model.Like;
import projectAIple.AIple.domain.workpost.model.Workpost;
import projectAIple.AIple.domain.workpost.repository.LikeRepository;
import projectAIple.AIple.domain.workpost.repository.WorkpostRepository;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorkpostService {
    private final WorkpostRepository workpostRepository;
    private final LikeRepository likeRepository;

    @Autowired
    private Bucket bucket;

    /**
     * 모든 외주 게시글들의 정보를 반환하는 메소드
     * @return WorkpostRepository 에서 가져온 모든 외주 게시글의 정보
     */
    public List<Workpost> getWorkpost() {
        try {
            return workpostRepository.getAllWorkpostInfo();
        } catch(Exception e) {
            log.error("WorkpostRepository getWorkpost exception occurred!");
            return Collections.EMPTY_LIST;
        }
    }

    /**
     * 특정 카테고리의 외주 게시글들의 정보를 반환하는 메소드
     * @return WorkpostRepository 에서 가져온 특정 카테고리의 외주 게시글들의 정보
     */
    public List<Workpost> getCategoryWorkpost(String category) {
        try {
            return workpostRepository.getCategoryWorkpostInfo(category);
        } catch(Exception e) {
            log.error("WorkpostRepository getCategoryWorkpost exception occurred!");
            return Collections.EMPTY_LIST;
        }
    }

    /**
     * 특정 제목의 외주 게시글들의 정보를 반환하는 메소드
     * @return WorkpostRepository 에서 가져온 특정 제목의 외주 게시글들의 정보
     */
    public List<Workpost> getWorkpostByTitle(String title) {
        try {
            return workpostRepository.findWorkpostByTitle(title);
        } catch(Exception e) {
            log.error("WorkpostRepository findWorkpostByTitle exception occurred!");
            return Collections.EMPTY_LIST;
        }
    }

    /**
     * 외주 게시글을 추가하는 메소드
     * @param workpost 추가할 외주 게시글 객체
     * @return 제대로 추가 되었는지 아닌지 boolean 전달 / true 성공, false 실패
     */
    public boolean addWorkpost(Workpost workpost, byte[] image) {

        try {
            String id = workpostRepository.addWorkpost(workpost);

            // File 저장 위치를 선언
            String blob = "/users/"+id+"/profile";
            // 이미 존재하면 파일 삭제
            if(bucket.get(blob) != null) {
                bucket.get(blob).delete();
            }
            // 파일을 Bucket에 저장
            bucket.create(blob, image);

            return true;
        } catch(Exception e) {
            log.error("WorkpostRepository addWorkpost exception occurred!");
            return false;
        }
    }

    /**
     * 외주 게시글을 수정하는 메소드
     * @param workpost 수정된 외주 게시글 객체
     * @return 제대로 수정 되었는지 아닌지 boolean 전달 / true 성공, false 실패
     */
    public boolean editWorkpost(Workpost workpost) {
        try {
            workpostRepository.editWorkpost(workpost);
            return true;
        } catch(Exception e) {
            log.error("WorkpostRepository editWorkpost exception occurred!");
            return false;
        }
    }

    /**
     * 외주 게시글을 삭제하는 메소드
     * @param id 외주 게시글의 고유 id
     * @return 제대로 삭제 되었는지 아닌지 boolean 전달 / true 성공, false 실패
     */
    public boolean deleteWorkpost(String id) {
        try {
            String blob = "/users/"+id+"/profile";
            bucket.get(blob).delete();

            workpostRepository.deleteWorkpostById(id);
            return true;
        } catch(Exception e) {
            log.error("WorkpostRepository editWorkpost exception occurred!");
            return false;
        }
    }

    /**
     * 외주 게시글의 좋아요를 누르는 메소드
     * @param like 추가할 like 객체
     * @param workpost 좋아요를 추가할 workpost객체
     * @return 성공했는지 실패했는지 확인하기 위한 짧은 string
     */
    public String likeWorkpost(Like like, Workpost workpost) {
        try {
            likeRepository.addLike(like);
            workpostRepository.likeWorkpost(workpost);
            return "like success!";
        } catch(Exception e) {
            log.error("error occurred!");
            return "like failed";
        }
    }

    /**
     * 외주 게시글의 좋아요를 취소하는 메소드
     * @param like 삭제할 like 객체
     * @param workpost 좋아요를 감소시킬 workpost 객체
     * @return 성공했는지 실패했는지 확인하기 위한 짧은 string
     */
    public String dislikeWorkpost(Like like, Workpost workpost) {
        try {
            likeRepository.deleteLike(like);
            workpostRepository.dislikeWorkpost(workpost);
            return "dislike success!";
        } catch(Exception e) {
            log.error("error occurred!");
            return "dislike failed";
        }
    }
}
