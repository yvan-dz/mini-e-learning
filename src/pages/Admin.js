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

const Admin = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: "", description: "", image: "" });
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

    fetchCourses();
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
    <div style={{ padding: "20px" }}>
      <h1>Admin-Bereich</h1>
      {editingCourse ? (
        <div style={{ marginBottom: "20px" }}>
          <h3>Kurs bearbeiten</h3>
          <input
            type="text"
            placeholder="Titel"
            value={editingCourse.title}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Beschreibung"
            value={editingCourse.description}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Bild-URL"
            value={editingCourse.image}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, image: e.target.value })
            }
          />
          <button onClick={handleEditCourse}>Änderungen speichern</button>
          <button onClick={() => setEditingCourse(null)}>Abbrechen</button>
        </div>
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <h3>Neuen Kurs hinzufügen</h3>
          <input
            type="text"
            placeholder="Titel"
            value={newCourse.title}
            onChange={(e) =>
              setNewCourse({ ...newCourse, title: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Beschreibung"
            value={newCourse.description}
            onChange={(e) =>
              setNewCourse({ ...newCourse, description: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Bild-URL"
            value={newCourse.image}
            onChange={(e) =>
              setNewCourse({ ...newCourse, image: e.target.value })
            }
          />
          <button onClick={handleAddCourse}>Kurs hinzufügen</button>
        </div>
      )}
      <div>
        <h3>Bestehende Kurse</h3>
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
            }}
          >
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
