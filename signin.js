const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000; // Update the port if needed

const pool = mysql.createPool({
  host: 'setuplib.c90g2owkymp9.ap-south-1.rds.amazonaws.com', // Replace with your RDS endpoint
  user: 'admin',     // Replace with your MySQL username
  password: 'admin123', // Replace with your MySQL password
  database: 'user', // Replace with your MySQL database name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Middleware for parsing JSON and url-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  // Render your HTML form here
  res.sendFile(__dirname);
});

app.post('/storeNumber', (req, res) => {
  const userInput = req.body.mail;
  const userInput2 = req.body.username;
  const userInput3 = req.body.password;


  // Insert the data into the database
  pool.query('INSERT INTO user2 (`Mail Id`,Username,Password) VALUES (?,?,?)', [userInput,userInput2,userInput3], (error, results) => {
    if (error) {
      return res.status(500).send('Error inserting data into the database.');
    }
    

    res.send('Data successfully inserted into the database.');
  });
});


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
