package projectAIple.AIple.domain.workpost.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import projectAIple.AIple.domain.workpost.model.Workpost;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Slf4j
@Repository
public class WorkpostRepository {
    public static final String COLLECTION_NAME = "WORKPOSTS";
    private static final Firestore FIRE_STORE = FirestoreClient.getFirestore();

    /**
     * 작성되어 있는 외주 게시글을 list 형태로 반환하는 메소드
     * @return 외주 게시글들의 list
     */
    public List<Workpost> getAllWorkpostsInfo() throws ExecutionException, InterruptedException {
        List<Workpost> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> future = FIRE_STORE.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            list.add(document.toObject(Workpost.class));
        }

        return list;
    }

    /**
     * 조회하고자 하는 카테고리에 해당하는 외주 게시글을 list 형태로 반환하는 메소드
     * @param category 조회하고자 하는 카테고리
     * @return 조회한 카테고리에 포함되는 외주 게시글들의 list
     */
    public List<Workpost> getCategoryWorkpostsInfo(String category) throws ExecutionException, InterruptedException {
        List<Workpost> list = new ArrayList<>();
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("category", category);
        ApiFuture<QuerySnapshot> future = query.get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            list.add(document.toObject(Workpost.class));
        }

        return list;
    }

    /**
     * 조회하고자 하는 제목이 포함되는 모든 외주 게시글을 list 형태로 반환하는 메소드
     * @param title 조회하고자 하는 제목의 일부
     * @return 조회한 제목이 포함되는 외주 게시글들의 list
     */
    public List<Workpost> findWorkpostsByName(String title) throws ExecutionException, InterruptedException {
        List<Workpost> list = new ArrayList<>();
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereArrayContains("title", title);
        ApiFuture<QuerySnapshot> future = query.get();

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            list.add(document.toObject(Workpost.class));
        }

        return list;
    }

    /**
     * 새로운 외주 게시글을 추가하는 메소드
     * @param workpost 추가할 외주 게시글 데이터
     */
    public void addWorkpost(Workpost workpost) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("id", workpost.getId());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        DocumentReference document = null;
        document = FIRE_STORE.collection(COLLECTION_NAME).document();
        workpost.setId(document.getId());
        document.set(workpost);
        document.update("create_dt", Timestamp.now());
        document.update("update_dt", Timestamp.now());
        log.info("새로운 문서가 추가되었습니다. document ID: {}", document.getId());
    }

    /**
     * 외주 게시글을 수정하는 메소드
     * @param workpost 수정할 외주 게시글 데이터
     */
    public void editWorkposts(Workpost workpost) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("id", workpost.getId());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        DocumentReference document = null;
        document = FIRE_STORE.collection(COLLECTION_NAME).document();
        document.set(workpost);
        document.update("update_dt", Timestamp.now());
        log.info("새로운 문서가 추가되었습니다. document ID: {}", document.getId());
    }

    /**
     * 외주 게시글을 삭제하는 메소드
     * @param id 삭제하고자 하는 외주 게시글의 id
     */
    public void deleteWorkpostById(String id) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("id", id);
        ApiFuture<QuerySnapshot> future = query.get();
        try {
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            if (!documents.isEmpty()) {
                Workpost workpost = documents.get(0).toObject(Workpost.class);
                FIRE_STORE.collection(COLLECTION_NAME).document(workpost.getId()).delete();
                return;
            }
            throw new RuntimeException("해당 id로 게시글이 존재하지 않습니다.");
        } catch (Exception e) {
            throw new RuntimeException("문서 조회를 실패하였습니다.");
        }
    }
}
