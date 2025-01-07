import axios from 'axios';

const API_URL = 'http://localhost:5000/api'; // Base URL for your backend API

// Function for user signup
export const signup = async (name, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, { name, email, password });
    return response.data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

// Function for user login
export const login = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Function to get all courses
export const getCourses = async () => {
  try {
    const response = await axios.get(`${API_URL}/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Function to enroll in a course
export const enrollInCourse = async (userId, courseId) => {
  try {
    const response = await axios.post(`${API_URL}/enroll`, { userId, courseId });
    return response.data;
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }
};

// Function to update progress
export const updateProgress = async (userId, courseId, completed) => {
  try {
    const response = await axios.post(`${API_URL}/progress`, { userId, courseId, completed });
    return response.data;
  } catch (error) {
    console.error('Error updating progress:', error);
    throw error;
  }
};
