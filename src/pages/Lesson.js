import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import "../styles/lesson.module.css"; // Importiere das CSS für besseres Styling
import {
  collection,
  query,
  where,
  getDocs,
  orderBy,
  addDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { auth } from "../services/firebase";


const Lesson = () => {
  const { courseId, lessonOrder } = useParams();
  const navigate = useNavigate();

  const [lesson, setLesson] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState([]);

  useEffect(() => {
    const fetchLessonsAndProgress = async () => {
      try {
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

        const currentLesson = lessonsData.find(
          (lesson) => lesson.order === parseInt(lessonOrder)
        );
        setLesson(currentLesson);

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

  const markLessonComplete = async () => {
    try {
      const progressQuery = query(
        collection(db, "progress"),
        where("userId", "==", auth.currentUser.uid),
        where("courseId", "==", courseId)
      );
      const progressSnapshot = await getDocs(progressQuery);

      if (progressSnapshot.empty) {
        await addDoc(collection(db, "progress"), {
          userId: auth.currentUser.uid,
          courseId,
          completedLessons: [lesson.order],
        });
      } else {
        const progressDoc = progressSnapshot.docs[0];
        const updatedLessons = [...new Set([...completedLessons, lesson.order])];
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

  if (loading) {
    return <p className="loading-text">Lade Lektion...</p>;
  }

  if (!lesson) {
    return <p className="no-lesson-text">Lektion nicht gefunden.</p>;
  }

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
    <div className="lesson-container">
      <h1 className="lesson-title">{lesson.title}</h1>
      <p className="lesson-content">{lesson.content}</p>

      <div className="lesson-status">
        <p>
          Status:{" "}
          {completedLessons.includes(lesson.order)
            ? "Abgeschlossen"
            : "Noch nicht abgeschlossen"}
        </p>
        {!completedLessons.includes(lesson.order) && (
          <button className="mark-complete-button" onClick={markLessonComplete}>
            Als abgeschlossen markieren
          </button>
        )}
      </div>

      <div className="lesson-navigation">
        <button
          className="nav-button"
          onClick={handlePrevious}
          disabled={lesson.order === 1}
        >
          Vorherige Lektion
        </button>
        <button
          className="nav-button"
          onClick={handleNext}
          disabled={lesson.order === lessons.length}
        >
          Nächste Lektion
        </button>
      </div>
    </div>
  );
};

export default Lesson;
