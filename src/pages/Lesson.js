import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, query, where, getDocs, orderBy, addDoc, updateDoc, doc } from "firebase/firestore";
import { auth } from "../services/firebase";

const Lesson = () => {
  const { courseId, lessonOrder } = useParams(); // Dynamische Parameter aus der URL
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null); // Aktuelle Lektion
  const [lessons, setLessons] = useState([]); // Alle Lektionen im Kurs
  const [loading, setLoading] = useState(true); // Ladezustand
  const [completedLessons, setCompletedLessons] = useState([]); // Abgeschlossene Lektionen

  useEffect(() => {
    // Lade Lektionen und Fortschritt
    const fetchLessonsAndProgress = async () => {
      try {
        // Alle Lektionen für den Kurs abrufen
        const lessonsQuery = query(
          collection(db, "lessons"),
          where("courseId", "==", courseId),
          orderBy("order")
        );
        const lessonsSnapshot = await getDocs(lessonsQuery);
        const lessonsData = lessonsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLessons(lessonsData);

        // Aktuelle Lektion finden
        const currentLesson = lessonsData.find(
          (lesson) => lesson.order === parseInt(lessonOrder)
        );
        setLesson(currentLesson);

        // Fortschritt laden
        const progressQuery = query(
          collection(db, "progress"),
          where("userId", "==", auth.currentUser.uid),
          where("courseId", "==", courseId)
        );
        const progressSnapshot = await getDocs(progressQuery);
        if (!progressSnapshot.empty) {
          const progressDoc = progressSnapshot.docs[0];
          setCompletedLessons(progressDoc.data().completedLessons || []);
        }
      } catch (error) {
        console.error("Fehler beim Abrufen der Daten:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonsAndProgress();
  }, [courseId, lessonOrder]);

  // Lektion als abgeschlossen markieren
  const markLessonComplete = async () => {
    try {
      const progressQuery = query(
        collection(db, "progress"),
        where("userId", "==", auth.currentUser.uid),
        where("courseId", "==", courseId)
      );
      const progressSnapshot = await getDocs(progressQuery);

      if (progressSnapshot.empty) {
        // Neues Fortschrittsdokument erstellen
        await addDoc(collection(db, "progress"), {
          userId: auth.currentUser.uid,
          courseId,
          completedLessons: [lesson.order],
        });
      } else {
        // Fortschritt aktualisieren
        const progressDoc = progressSnapshot.docs[0];
        const updatedLessons = [...new Set([...completedLessons, lesson.order])]; // Duplikate vermeiden
        await updateDoc(doc(db, "progress", progressDoc.id), {
          completedLessons: updatedLessons,
        });
        setCompletedLessons(updatedLessons);
      }

      alert("Lektion als abgeschlossen markiert!");
    } catch (error) {
      console.error("Fehler beim Speichern des Fortschritts:", error);
    }
  };

  // Ladezustand anzeigen
  if (loading) {
    return <p>Lade Lektion...</p>;
  }

  // Fehlende Lektion behandeln
  if (!lesson) {
    return <p>Lektion nicht gefunden.</p>;
  }

  // Navigation: Nächste und vorherige Lektion
  const handleNext = () => {
    const nextLesson = lessons.find((l) => l.order === lesson.order + 1);
    if (nextLesson) {
      navigate(`/courses/${courseId}/lessons/${nextLesson.order}`);
    }
  };

  const handlePrevious = () => {
    const prevLesson = lessons.find((l) => l.order === lesson.order - 1);
    if (prevLesson) {
      navigate(`/courses/${courseId}/lessons/${prevLesson.order}`);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* Lektionstitel und Inhalt */}
      <h1>{lesson.title}</h1>
      <p>{lesson.content}</p>

      {/* Fortschrittsstatus */}
      <div>
        <p>Status: {completedLessons.includes(lesson.order) ? "Abgeschlossen" : "Noch nicht abgeschlossen"}</p>
        {!completedLessons.includes(lesson.order) && (
          <button onClick={markLessonComplete}>Als abgeschlossen markieren</button>
        )}
      </div>

      {/* Navigation */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handlePrevious} disabled={lesson.order === 1}>
          Vorherige Lektion
        </button>
        <button onClick={handleNext} disabled={lesson.order === lessons.length}>
          Nächste Lektion
        </button>
      </div>
    </div>
  );
};

export default Lesson;
