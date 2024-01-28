package projectAIple.AIple.domain.user.repository;

import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import projectAIple.AIple.domain.user.model.Designer;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Slf4j
@Repository
public class DesignerRepository {
    public static final String COLLECTION_NAME = "DESIGNERS";
    private static final Firestore FIRE_STORE = FirestoreClient.getFirestore();

    public List<Designer> getAllDesignersInfo() throws ExecutionException, InterruptedException {
        List<Designer> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> future = FIRE_STORE.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            list.add(document.toObject(Designer.class));
        }
        return list;
    }

    public void addDesigner(Designer designer) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("email", designer.getBusinessEmail());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        DocumentReference document = null;
        if (isNotExistEmail(querySnapshot)) {
            document = FIRE_STORE.collection(COLLECTION_NAME).document();
            // designer.setId(document.getId());
            document.set(designer);
            document.update("create_dt", Timestamp.now());
            document.update("update_dt", Timestamp.now());
            log.info("새로운 문서가 추가되었습니다. document ID: {}", document.getId());
        } else {
            throw new RuntimeException("이미 가입된 이메일입니다.");
        }
    }

    public void editDesigner(Designer designer) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("email", designer.getBusinessEmail());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        DocumentReference document = null;
        if (isExistEmail(querySnapshot)) {
            document = FIRE_STORE.collection(COLLECTION_NAME).document(designer.getId());
            document.update("name", designer.getName());
            document.update("update_dt", Timestamp.now());
            log.info("문서가 수정되었습니다. document ID: {}", document.getId());
        } else {
            throw new RuntimeException("해당 이메일로 계정이 존재하지 않습니다.");
        }
    }

    private boolean isNotExistEmail(ApiFuture<QuerySnapshot> querySnapshot) {
        try {
            return querySnapshot.get().isEmpty();
        } catch (Exception e) {
            throw new RuntimeException("문서 조회를 실패하였습니다.");
        }
    }

    private boolean isExistEmail(ApiFuture<QuerySnapshot> querySnapshot) {
        return !this.isNotExistEmail(querySnapshot);
    }

    public Optional<Designer> findDesignerByEmail(String email) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("email", email);
        ApiFuture<QuerySnapshot> future = query.get();
        try {
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            if (!documents.isEmpty()) {
                return Optional.of(documents.get(0).toObject(Designer.class));
            }
            return Optional.empty();
        } catch (Exception e) {
            throw new RuntimeException("문서 조회를 실패하였습니다.");
        }
    }

    public void removeDesignerByEmail(String email) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("email", email);
        ApiFuture<QuerySnapshot> future = query.get();
        try {
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            if (!documents.isEmpty()) {
                Designer user = documents.get(0).toObject(Designer.class);
                FIRE_STORE.collection(COLLECTION_NAME).document(user.getId()).delete();
                return;
            }
            throw new RuntimeException("해당 이메일로 계정이 존재하지 않습니다.");
        } catch (Exception e) {
            throw new RuntimeException("문서 조회를 실패하였습니다.");
        }
    }

    public long countAllDesigners() {
        CollectionReference collectionRef = FIRE_STORE.collection(COLLECTION_NAME);
        ApiFuture<QuerySnapshot> query = collectionRef.get();
        QuerySnapshot querySnapshot = null;
        try {
            querySnapshot = query.get();
            return querySnapshot.size();
        } catch (Exception e) {
            throw new RuntimeException("문서 조회를 실패하였습니다.");
        }
    }
}
