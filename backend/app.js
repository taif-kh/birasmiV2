const express = require('express');
const app = express();
const path = require('path');
app.use('/', express.static(path.join(__dirname, '../')));


app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../index.html'));
  });

  app.get('/sign-up', (req, res) => {
    res.sendFile(path.join(__dirname, '../signin.html'));
  });

  app.get('/welcome-student', (req, res) => {
    res.sendFile(path.join(__dirname, '../Student.html'));
  });


  app.get('/welcome-employer', (req, res) => {
    res.sendFile(path.join(__dirname, '../Employer1.html'));
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
