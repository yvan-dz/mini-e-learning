import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { db } from "../services/firebase";
import { collection, query, where, getDocs, orderBy, doc, getDoc } from "firebase/firestore";
import "../styles/courseDetails.css"; // CSS importieren

const CourseDetails = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const [lessons, setLessons] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        // Abrufen des spezifischen Kursdokuments
        const courseDocRef = doc(db, "courses", courseId);
        const courseDoc = await getDoc(courseDocRef);

        if (courseDoc.exists()) {
          const courseData = courseDoc.data();
          setCourseTitle(courseData.title || "Kein Titel verfügbar");
          setCourseDescription(courseData.description || "Keine Beschreibung verfügbar");
        } else {
          console.error("Der Kurs wurde nicht gefunden.");
        }

        // Abrufen der Lektionen
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
      } catch (error) {
        console.error("Fehler beim Abrufen der Kursdetails:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (loading) {
    return <p className="loading-text">Lade Kursdetails...</p>;
  }

  if (!courseTitle && !courseDescription) {
    return <p className="no-course-text">Kursinformationen konnten nicht geladen werden.</p>;
  }

  if (lessons.length === 0) {
    return <p className="no-lessons-text">Keine Lektionen für diesen Kurs gefunden.</p>;
  }

  return (
    <div className="course-details-container">
      <h1 className="course-title">Kursdetails: {courseTitle}</h1>

      {/* Kursbeschreibung */}
      <p className="course-description">{courseDescription}</p>

      {/* Liste der Lektionen */}
      <ul className="lesson-list">
        {lessons.map((lesson) => (
          <li key={lesson.id} className="lesson-item">
            <span className="lesson-title">
              {lesson.order}. {lesson.title}
            </span>
            <Link to={`/courses/${courseId}/lessons/${lesson.order}`} className="lesson-link">
              Zur Lektion
            </Link>
          </li>
        ))}
      </ul>

      {/* Buttons */}
      <div className="button-group">
        <button className="back-button" onClick={() => navigate("/courses")}>
          Zurück zur Kursübersicht
        </button>
        <button className="start-button" onClick={() => navigate(`/courses/${courseId}/lessons/1`)}>
          Kurs starten
        </button>
      </div>
    </div>
  );
};

export default CourseDetails;
