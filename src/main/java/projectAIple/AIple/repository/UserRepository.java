package projectAIple.AIple.repository;
import com.google.api.core.ApiFuture;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Repository;
import projectAIple.AIple.domain.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.ExecutionException;

@Slf4j
@Repository
public class UserRepository {

    public static final String COLLECTION_NAME = "USERS";
    private static final Firestore FIRE_STORE = FirestoreClient.getFirestore();

    public List<User> getAllUsers() throws ExecutionException, InterruptedException {
        List<User> list = new ArrayList<>();
        ApiFuture<QuerySnapshot> future = FIRE_STORE.collection(COLLECTION_NAME).get();
        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        for (QueryDocumentSnapshot document : documents) {
            list.add(document.toObject(User.class));
        }
        return list;
    }

    public void addUser(User user) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("email", user.getEmail());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        DocumentReference document = null;
        if (isNotExistEmail(querySnapshot)) {
            document = FIRE_STORE.collection(COLLECTION_NAME).document();
            user.setId(document.getId());
            document.set(user);
            log.info("새로운 문서가 추가되었습니다. document ID: {}", document.getId());
        } else {
            throw new RuntimeException("이미 가입된 이메일입니다.");
        }
    }

    public void editUser(User user) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("email", user.getEmail());
        ApiFuture<QuerySnapshot> querySnapshot = query.get();

        DocumentReference document = null;
        if (isExistEmail(querySnapshot)) {
            document = FIRE_STORE.collection(COLLECTION_NAME).document(user.getId());
            document.update("name", user.getNickname());
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

    public Optional<User> findUserByEmail(String email) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("email", email);
        ApiFuture<QuerySnapshot> future = query.get();
        try {
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            if (!documents.isEmpty()) {
                return Optional.of(documents.get(0).toObject(User.class));
            }
            return Optional.empty();
        } catch (Exception e) {
            throw new RuntimeException("문서 조회를 실패하였습니다.");
        }
    }

    public void removeUserByEmail(String email) {
        Query query = FIRE_STORE.collection(COLLECTION_NAME).whereEqualTo("email", email);
        ApiFuture<QuerySnapshot> future = query.get();
        try {
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();
            if (!documents.isEmpty()) {
                User user = documents.get(0).toObject(User.class);
                FIRE_STORE.collection(COLLECTION_NAME).document(user.getId()).delete();
                return;
            }
            throw new RuntimeException("해당 이메일로 계정이 존재하지 않습니다.");
        } catch (Exception e) {
            throw new RuntimeException("문서 조회를 실패하였습니다.");
        }
    }

    public long countAllUsers() {
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
