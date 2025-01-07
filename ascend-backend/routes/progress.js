app.post('/api/progress', async (req, res) => {
  const { userId, courseId, completed } = req.body;
  try {
    await pool.query(
      'INSERT INTO progress (user_id, course_id, completed) VALUES ($1, $2, $3) ON CONFLICT (user_id, course_id) DO UPDATE SET completed = $3',
      [userId, courseId, completed]
    );
    res.json({ message: 'Progress updated successfully' });
  } catch (err) {
    console.error('Error updating progress:', err);
    res.status(500).json({ error: 'Error updating progress' });
  }
});
