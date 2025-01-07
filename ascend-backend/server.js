const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL Pool Setup
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ascend',
  password: 'Nyabor27', 
  port: 5432, // Default PostgreSQL port
});

// Test PostgreSQL Connection
pool.connect()
  .then(() => console.log('PostgreSQL connected successfully'))
  .catch(err => console.error('PostgreSQL connection error:', err));

// Test API Route
app.get('/api/test', (req, res) => {
  res.send({ message: 'Backend is connected!' });
});

// Fetch Users Route
app.get('/api/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching users');
  }
});

// Start the Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Signup
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';  // Replace with a strong key!

app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email',
      [name, email, hashedPassword]
    );
    res.status(201).json({ message: 'User created successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    const isValidPassword = await bcrypt.compare(password, user.rows[0].password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.rows[0].id, email: user.rows[0].email }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error logging in' });
  }
});

app.get('/api/courses', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM courses');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching courses:', err);
    res.status(500).send('Internal server error');
  }
});

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

app.get('/api/enrollments/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const result = await pool.query(`
      SELECT courses.title, courses.description 
      FROM courses 
      INNER JOIN enrollments ON courses.id = enrollments.course_id 
      WHERE enrollments.user_id = $1`, [userId]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching enrollments:', err);
    res.status(500).send('Internal server error');
  }
});

app.post('/api/progress', async (req, res) => {
  const { userId, courseId, completed } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO progress (user_id, course_id, completed) VALUES ($1, $2, $3) ON CONFLICT (user_id, course_id) DO UPDATE SET completed = $3',
      [userId, courseId, completed]
    );
    res.json({ message: 'Progress updated successfully' });
  } catch (err) {
    console.error('Error updating progress:', err);
    res.status(500).json({ error: 'Error updating progress' });
  }
});
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


  