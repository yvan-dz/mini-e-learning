import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";
import "../styles/courses.css"; // CSS importieren

const Courses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "courses"));
        const coursesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCourses(coursesData);
      } catch (error) {
        console.error("Fehler beim Abrufen der Kurse:", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="courses-container">
      <h1>Kurse</h1>
      <div className="courses-grid">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id} className="course-card">
              <img src={course.image} alt={course.title} className="course-image" />
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>
              <Link to={`/courses/${course.id}`} className="course-link">
                Zu den Lektionen
              </Link>
            </div>
          ))
        ) : (
          <p>Keine Kurse verfügbar.</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
