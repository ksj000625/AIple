package projectAIple.AIple.domain.workpost.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import projectAIple.AIple.domain.workpost.model.Workpost;
import projectAIple.AIple.domain.workpost.repository.WorkpostRepository;

import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class WorkpostService {
    private final WorkpostRepository workpostRepository;

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
    public boolean addWorkpost(Workpost workpost) {
        try {
            workpostRepository.addWorkpost(workpost);
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
            workpostRepository.deleteWorkpostById(id);
            return true;
        } catch(Exception e) {
            log.error("WorkpostRepository editWorkpost exception occurred!");
            return false;
        }
    }
}
