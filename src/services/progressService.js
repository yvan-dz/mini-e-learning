import { db } from "./firebase";
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from "firebase/firestore";

// Fortschritt eines Benutzers laden
export const getUserProgress = async (userId, courseId) => {
  try {
    const q = query(
      collection(db, "progress"),
      where("userId", "==", userId),
      where("courseId", "==", courseId)
    );
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const progressDoc = querySnapshot.docs[0];
      return { id: progressDoc.id, ...progressDoc.data() };
    }
    return null; // Kein Fortschritt vorhanden
  } catch (error) {
    console.error("Fehler beim Laden des Fortschritts:", error);
    throw error;
  }
};

// Fortschritt für einen Kurs speichern oder aktualisieren
export const saveUserProgress = async (userId, courseId, completedLessons) => {
  try {
    const existingProgress = await getUserProgress(userId, courseId);

    if (!existingProgress) {
      // Neues Fortschrittsdokument erstellen
      await addDoc(collection(db, "progress"), {
        userId,
        courseId,
        completedLessons,
      });
    } else {
      // Fortschritt aktualisieren
      await updateDoc(doc(db, "progress", existingProgress.id), {
        completedLessons,
      });
    }
  } catch (error) {
    console.error("Fehler beim Speichern des Fortschritts:", error);
    throw error;
  }
};
