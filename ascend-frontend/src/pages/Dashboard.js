import React, { useEffect, useState } from 'react';
import { getCourses, updateProgress } from '../services/api';

function Dashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        alert('Error loading dashboard');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleComplete = async (courseId) => {
    try {
      await updateProgress(1, courseId, true); // Replace with real user ID
      alert(`Course ${courseId} marked as complete!`);
    } catch (error) {
      alert('Failed to update progress.');
    }
  };

  if (loading) return <h2>Loading your dashboard...</h2>;

  return (
    <div>
      <h1>Your Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h2>{course.title}</h2>
            <button onClick={() => handleComplete(course.id)}>Mark Complete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
