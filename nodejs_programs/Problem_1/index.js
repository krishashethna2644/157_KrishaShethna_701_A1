const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Serve static HTML
app.use(express.static('public'));

// GET /gethello
app.get('/gethello', (req, res) => {
  res.send('Hello NodeJS!!');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
