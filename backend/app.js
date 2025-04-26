const express = require('express');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');

// Middleware
app.use(express.static(path.join(__dirname, '../')));
app.use(bodyParser.json());
app.use(express.json());

// Routes for serving HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/sign-up', (req, res) => {
  res.sendFile(path.join(__dirname, '../signin.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../login.html'));
});

app.get('/welcome-student', (req, res) => {
  res.sendFile(path.join(__dirname, '../Student.html'));
});

app.get('/welcome-employer', (req, res) => {
  res.sendFile(path.join(__dirname, '../Employer1.html'));
});

// Database setup
const db = new sqlite3.Database('users.db', (err) => {
  if (err) return console.error(err.message);
  console.log('Connected to SQLite database.');
});

// Create users table with all fields (for both student and employer)
db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  first_name TEXT,
  last_name TEXT,
  university TEXT,
  field_of_study TEXT,
  degree_level TEXT,
  graduation_date TEXT,
  
  company_name TEXT,
  industry TEXT,
  company_size TEXT,
  country TEXT,
  city TEXT,
  website TEXT,
  contact_name TEXT,
  
  email TEXT UNIQUE,
  phone TEXT,
  password TEXT,
  
  account_type TEXT
)`);

// Signup route
app.post('/signup', (req, res) => {
  const {
    firstName,
    lastName,
    university,
    field,
    degree,
    graduation,
    companyName,
    industry,
    companySize,
    country,
    city,
    website,
    contactName,
    email,
    phone,
    password,
    accountType
  } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  const query = `
    INSERT INTO users (
      first_name, last_name, university, field_of_study, degree_level, graduation_date,
      company_name, industry, company_size, country, city, website, contact_name,
      email, phone, password, account_type
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(query, [
    firstName || null,
    lastName || null,
    university || null,
    field || null,
    degree || null,
    graduation || null,
    companyName || null,
    industry || null,
    companySize || null,
    country || null,
    city || null,
    website || null,
    contactName || null,
    email,
    phone || null,
    password,
    accountType || null
  ], function (err) {
    if (err) {
      if (err.message.includes('UNIQUE')) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ 
      message: 'Account created successfully',
      userId: this.lastID 
    });
  });
});

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password are required' });

  const query = `SELECT * FROM users WHERE email = ? AND password = ?`;
  db.get(query, [email, password], (err, user) => {
    if (err) return res.status(500).json({ error: err.message });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    res.status(200).json({ 
      message: 'Login successful',
      user
    });
  });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
