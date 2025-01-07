import React, { useEffect, useState } from 'react';
import { getCourses, enrollInCourse } from '../services/api';

function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const data = await getCourses();
        setCourses(data);
      } catch (error) {
        alert('Error fetching courses');
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      const userId = 1; // Replace with real user ID
      await enrollInCourse(userId, courseId);
      alert(`Successfully enrolled in course ${courseId}`);
    } catch (error) {
      alert('Error enrolling in course.');
    }
  };

  if (loading) return <h2>Loading courses...</h2>;

  return (
    <div>
      <h1>Available Courses</h1>
      <ul>
        {courses.map(course => (
          <li key={course.id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <button onClick={() => handleEnroll(course.id)}>Enroll</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Courses;
