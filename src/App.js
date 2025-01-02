import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Courses from "./pages/Courses";
import ProtectedRoute from "./components/ProtectedRoute";
import CourseDetails from "./pages/CourseDetails";
import Admin from "./pages/Admin";
import Lesson from "./pages/Lesson";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Startseite */}
        <Route path="/" element={<Home />} />
        
        {/* Registrierung und Login */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        
        {/* Kursübersicht */}
        <Route
          path="/courses"
          element={
            <ProtectedRoute>
              <Courses />
            </ProtectedRoute>
          }
        />
        
        {/* Kursdetails */}
        <Route
          path="/courses/:id"
          element={
            <ProtectedRoute>
              <CourseDetails />
            </ProtectedRoute>
          }
        />
        
        {/* Lektionsseiten */}
        <Route
          path="/courses/:courseId/lessons/:lessonOrder"
          element={
            <ProtectedRoute>
              <Lesson />
            </ProtectedRoute>
          }
        />
        
        {/* Admin-Bereich */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        
        {/* 404-Seite */}
        <Route path="*" element={<h1>Seite nicht gefunden</h1>} />
      </Routes>
    </Router>
  );
}

export default App;