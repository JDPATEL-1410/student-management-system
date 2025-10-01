import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentDetails from './components/StudentDetails';

export default function App(){
  return (
    <div className="container py-4">
      <header className="d-flex align-items-center mb-4">
        <Link to="/" className="me-auto text-decoration-none"><h1 className="h4">Student Management (Read‑Only)</h1></Link>
        <nav>
          <Link to="/" className="btn btn-outline-primary btn-sm">Students</Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<StudentList />} />
          <Route path="/student/:id" element={<StudentDetails />} />
        </Routes>
      </main>

      <footer className="mt-5 text-center text-muted">
        Data fetched from jsonplaceholder.typicode.com (read-only)
      </footer>
    </div>
  );
}
