const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory storage for contact form submissions
const submissions = [];

// POST endpoint for contact form submissions
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  submissions.push({ name, email, message });
  res.status(201).json({ message: 'Submission received' });
});

// GET endpoint to retrieve all submissions (for testing)
app.get('/api/contact', (req, res) => {
  res.json(submissions);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 