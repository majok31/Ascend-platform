const express = require('express');
const pool = require('../db');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
app.post('/api/enroll', async (req, res) => {
  const { userId, courseId } = req.body;
  try {
    await pool.query('INSERT INTO enrollments (user_id, course_id) VALUES ($1, $2)', [userId, courseId]);
    res.status(201).json({ message: 'Enrolled successfully' });
  } catch (err) {
    console.error('Error enrolling in course:', err);
    res.status(500).send('Internal server error');
  }
});
