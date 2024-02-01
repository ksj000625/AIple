package projectAIple.AIple.domain.workpost.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import projectAIple.AIple.domain.workpost.model.Like;
import projectAIple.AIple.domain.workpost.model.Workpost;

import java.util.List;
import java.util.Optional;

@Slf4j
@Repository
public class LikeRepository {
    public static final String COLLECTION_NAME = "LIKE";
    private static final Firestore FIRE_STORE = FirestoreClient.getFirestore();

    /**
     * 새로운 좋아요 정보를 추가합니다.
     * @param like 추가하려고 하는 Like 객체
     */
    public void addLike(Like like) {
           Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("id", like.getId());
           ApiFuture<QuerySnapshot> querySnapshot = query.get();
           DocumentReference document = null;
           if (isNotExistId(querySnapshot)) {
               document = FIRE_STORE.collection(COLLECTION_NAME).document();
               like.setId(document.getId());
               document.set(like);
               log.info("새로운 문서가 추가되었습니다. document ID: {}", document.getId());
           } else {
               throw new RuntimeException("이미 가입된 이메일입니다.");
           }
    }

    /**
     * 회원이 어떤 게시글에 들어갈 때 좋아요를 이미 눌렀는지 확인하는 메소드
     * @param like controller에서 받은 userId와 workpostId를 기반으로 만든
     * @return
     */
    public boolean isExistLike(Like like) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("userId", like.getUserId()).whereEqualTo("workpostId", like.getWorkpostId());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();
        if (isExistId(querySnapshot)) {
            return false;
        } else {
            return true;
        }
    }

    private boolean isNotExistId(ApiFuture<QuerySnapshot> querySnapshot) {
        try {
            return querySnapshot.get().isEmpty();
        } catch (Exception e) {
            throw new RuntimeException("문서 조회를 실패하였습니다.");
        }
    }

    private boolean isExistId(ApiFuture<QuerySnapshot> querySnapshot) {
        return !this.isNotExistId(querySnapshot);
    }

    public void deleteLike(String id) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("id", id);
        ApiFuture<QuerySnapshot> future = query.get();
        try {
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            if (!documents.isEmpty()) {
                Like like = documents.get(0).toObject(Like.class);
                FIRE_STORE.collection(COLLECTION_NAME).document(like.getId()).delete();
                return;
            }
            throw new RuntimeException("해당 id로 좋아요가 존재하지 않습니다.");
        } catch (Exception e) {
            throw new RuntimeException("문서 조회를 실패하였습니다.");
        }
    }
}