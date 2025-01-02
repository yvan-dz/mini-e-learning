import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../services/firebase";
import { doc, getDoc } from "firebase/firestore";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const docRef = doc(db, "courses", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setCourse(docSnap.data());
        } else {
          console.log("Kein Kurs gefunden!");
        }
      } catch (error) {
        console.error("Fehler beim Abrufen des Kurses:", error);
      }
    };

    fetchCourse();
  }, [id]);

  if (!course) {
    return <p>Lade Kursdetails...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>{course.title}</h1>
      <img
        src={course.image}
        alt={course.title}
        style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
      />
      <p>{course.description}</p>
      {/* Platz für weitere Inhalte wie Lektionen oder Quiz */}
    </div>
  );
};

export default CourseDetails;
