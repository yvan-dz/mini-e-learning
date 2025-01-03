import React, { useState, useEffect } from "react";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import "../styles/admin.css"; // CSS importieren

const Admin = () => {
  const [courses, setCourses] = useState([]);
  const [lessons, setLessons] = useState([]);
  const [newCourse, setNewCourse] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [newLesson, setNewLesson] = useState({
    courseId: "",
    title: "",
    content: "",
    order: 1,
  });
  const [editingCourse, setEditingCourse] = useState(null);

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

    const fetchLessons = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "lessons"));
        const lessonsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLessons(lessonsData);
      } catch (error) {
        console.error("Fehler beim Abrufen der Lektionen:", error);
      }
    };

    fetchCourses();
    fetchLessons();
  }, []);

  const handleAddCourse = async () => {
    try {
      await addDoc(collection(db, "courses"), newCourse);
      alert("Kurs erfolgreich hinzugefügt!");
      setCourses([...courses, newCourse]);
      setNewCourse({ title: "", description: "", image: "" });
    } catch (error) {
      console.error("Fehler beim Hinzufügen des Kurses:", error);
    }
  };

  const handleAddLesson = async () => {
    try {
      await addDoc(collection(db, "lessons"), newLesson);
      alert("Lektion erfolgreich hinzugefügt!");
      setLessons([...lessons, newLesson]);
      setNewLesson({ courseId: "", title: "", content: "", order: 1 });
    } catch (error) {
      console.error("Fehler beim Hinzufügen der Lektion:", error);
    }
  };

  const handleDeleteCourse = async (id) => {
    try {
      await deleteDoc(doc(db, "courses", id));
      setCourses(courses.filter((course) => course.id !== id));
      alert("Kurs erfolgreich gelöscht!");
    } catch (error) {
      console.error("Fehler beim Löschen des Kurses:", error);
    }
  };

  const handleEditCourse = async () => {
    try {
      if (!editingCourse) return;

      await updateDoc(doc(db, "courses", editingCourse.id), {
        title: editingCourse.title,
        description: editingCourse.description,
        image: editingCourse.image,
      });

      alert("Kurs erfolgreich bearbeitet!");
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.id === editingCourse.id ? editingCourse : course
        )
      );
      setEditingCourse(null);
    } catch (error) {
      console.error("Fehler beim Bearbeiten des Kurses:", error);
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin-Bereich</h1>

      {/* Kurs bearbeiten oder hinzufügen */}
      {editingCourse ? (
        <div className="admin-form">
          <h3>Kurs bearbeiten</h3>
          <input
            type="text"
            placeholder="Titel"
            value={editingCourse.title}
            onChange={(e) => setEditingCourse({ ...editingCourse, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Beschreibung"
            value={editingCourse.description}
            onChange={(e) => setEditingCourse({ ...editingCourse, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Bild-URL"
            value={editingCourse.image}
            onChange={(e) => setEditingCourse({ ...editingCourse, image: e.target.value })}
          />
          <button onClick={handleEditCourse}>Änderungen speichern</button>
          <button onClick={() => setEditingCourse(null)}>Abbrechen</button>
        </div>
      ) : (
        <div className="admin-form">
          <h3>Neuen Kurs hinzufügen</h3>
          <input
            type="text"
            placeholder="Titel"
            value={newCourse.title}
            onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Beschreibung"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Bild-URL"
            value={newCourse.image}
            onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
          />
          <button onClick={handleAddCourse}>Kurs hinzufügen</button>
        </div>
      )}

      {/* Abschnitt zum Hinzufügen von Lektionen */}
      <div className="admin-form">
        <h3>Neue Lektion hinzufügen</h3>
        <select
          value={newLesson.courseId}
          onChange={(e) => setNewLesson({ ...newLesson, courseId: e.target.value })}
        >
          <option value="">Kurs auswählen</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Titel"
          value={newLesson.title}
          onChange={(e) => setNewLesson({ ...newLesson, title: e.target.value })}
        />
        <textarea
          placeholder="Inhalt"
          value={newLesson.content}
          onChange={(e) => setNewLesson({ ...newLesson, content: e.target.value })}
        ></textarea>
        <input
          type="number"
          placeholder="Reihenfolge (order)"
          value={newLesson.order}
          onChange={(e) => setNewLesson({ ...newLesson, order: parseInt(e.target.value) })}
        />
        <button onClick={handleAddLesson}>Lektion hinzufügen</button>
      </div>

      {/* Bestehende Kurse */}
      <div className="courses-list">
        <h3>Bestehende Kurse</h3>
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <button onClick={() => setEditingCourse(course)}>Bearbeiten</button>
            <button onClick={() => handleDeleteCourse(course.id)}>Löschen</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;
