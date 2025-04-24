const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const path = require('path');

const app = express();
const port = 3001;

// Middleware setup
app.use(cors());
app.use(express.json()); // This replaces body-parser for JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '290103',
  database: 'internshive'
});

db.connect(err => {
  if (err) {
    console.error('❌ DB connection error:', err);
    return;
  }
  console.log('✅ Connected to MySQL database!');
});

// POST - create internship (single route handler)
app.post('/internships', (req, res) => {
  console.log("Request Body:", req.body); // Debug log
  
  if (!req.body) {
    return res.status(400).send('No data received');
  }

  const { 
    title, 
    type, 
    location, 
    remote_option, 
    duration, 
    deadline, 
    positions, 
    description, 
    education_level, 
    field_of_study, 
    required_skills, 
    additional_requirements, 
    application_method, 
    application_email, 
    application_instructions 
  } = req.body;

  // Validate required fields
  if (!title || !type || !location || !remote_option || !duration || !deadline || !positions || !description) {
    return res.status(400).send('All required fields must be filled.');
  }

  const sql = `
    INSERT INTO internships (
      title, type, location, remote_option, duration,
      deadline, positions, description, education_level,
      field_of_study, required_skills, additional_requirements,
      application_method, application_email, application_instructions
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    title,
    type,
    location,
    remote_option,
    duration,
    deadline,
    positions,
    description,
    education_level,
    field_of_study,
    required_skills,
    additional_requirements,
    application_method,
    application_email,
    application_instructions
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Error inserting internship:', err);
      return res.status(500).send('Error saving internship');
    }
    console.log('✅ Internship saved!');
    res.status(200).send('Internship created successfully');
  });
});

// Other routes remain the same...
app.get('/internships', (req, res) => {
  db.query('SELECT * FROM internships', (err, results) => {
    if (err) {
      console.error('❌ Error fetching internships:', err);
      return res.status(500).send('Error fetching internships');
    }
    res.json(results);
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`🚀 Server is running at http://localhost:${port}`);
});