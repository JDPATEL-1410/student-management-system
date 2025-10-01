import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function StudentDetails(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=> {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(res => {
        if(!res.ok) throw new Error('Failed to fetch student');
        return res.json();
      })
      .then(u => {
        const s = {
          id: u.id,
          name: u.name,
          email: u.email,
          phone: u.phone,
          website: u.website,
          course: (u.company && u.company.bs) ? u.company.bs.split(' ')[0].toUpperCase() : 'N/A',
          address: u.address ? `${u.address.suite}, ${u.address.street}, ${u.address.city}` : ''
        };
        setStudent(s);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message || 'Failed to fetch');
        setLoading(false);
      });
  }, [id]);

  if(loading) return <div className="empty-state text-center">Loading...</div>;
  if(error) return <div className="empty-state text-center text-danger">Error: {error}</div>;
  if(!student) return <div className="empty-state text-center">Student not found.</div>;

  return (
    <div className="card p-4">
      <div className="d-flex align-items-start">
        <div className="flex-grow-1">
          <h3 className="mb-1">{student.name}</h3>
          <div className="text-muted">Course: {student.course}</div>
          <div className="text-muted">Email: {student.email}</div>
          <div className="text-muted">Phone: {student.phone}</div>
          <div className="text-muted">Website: {student.website}</div>
          <div className="text-muted">Address: {student.address}</div>
        </div>
        <div>
          <button className="btn btn-sm btn-outline-secondary me-2" onClick={()=>navigate(-1)}>Back</button>
        </div>
      </div>

      <hr />

      <section>
        <h6 className="h6">Notes</h6>
        <p className="small text-muted">This project is read-only. Add/Edit/Delete operations are intentionally disabled because data comes from a public mock API.</p>
      </section>
    </div>
  );
}
