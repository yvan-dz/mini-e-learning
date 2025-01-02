import React, { useEffect, useState } from "react";
import { db } from "../services/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

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
    <div style={{ padding: "20px" }}>
      <h1>Kurse</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {courses.length > 0 ? (
          courses.map((course) => (
            <div
              key={course.id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "10px",
                width: "200px",
                textAlign: "center",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={course.image}
                alt={course.title}
                style={{ width: "100%", borderRadius: "5px" }}
              />
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <Link
                to={`/courses/${course.id}`}
                style={{
                  color: "blue",
                  textDecoration: "none",
                  marginTop: "10px",
                  display: "inline-block",
                }}
              >
                Mehr erfahren
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
