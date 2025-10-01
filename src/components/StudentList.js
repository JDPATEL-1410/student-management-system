import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function StudentList(){
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        if(!res.ok) throw new Error('Network response was not ok');
        return res.json();
      })
      .then(data => {
        // map API user to student-friendly shape
        const mapped = data.map(u => ({
          id: u.id,
          name: u.name,
          email: u.email,
          course: (u.company && u.company.bs) ? u.company.bs.split(' ')[0].toUpperCase() : 'N/A',
          age: 18 + (u.id % 10)
        }));
        setStudents(mapped);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to fetch');
        setLoading(false);
      });
  }, []);

  if(loading) return <div className="empty-state text-center">Loading students...</div>;
  if(error) return <div className="empty-state text-center text-danger">Error: {error}</div>;

  return (
    <div>
      <div className="mb-3 d-flex justify-content-between align-items-center">
        <h2 className="h5 m-0">Students ({students.length})</h2>
      </div>

      {students.length === 0 ? (
        <div className="empty-state text-center">
          No students found.
        </div>
      ) : (
        <div className="row g-3">
          {students.map(s => (
            <div className="col-12 col-md-6" key={s.id}>
              <div className="card card-student p-3">
                <div className="d-flex align-items-center">
                  <div className="flex-grow-1">
                    <h5 className="mb-1">{s.name}</h5>
                    <div className="text-muted small">{s.course} • Age {s.age}</div>
                    <div className="text-muted small">{s.email}</div>
                  </div>
                  <div className="ms-3 text-end">
                    <Link to={`/student/${s.id}`} className="btn btn-sm btn-outline-primary">View</Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
