const express = require('express');
const Parser = require('rss-parser'); // Note: Use 'rss-parser' instead of 'parser'
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());
app.use(cors());

// API endpoint to convert RSS to JSON
app.get('/', async (req, res) => {
  res.send("Vist https://github.com/BhavyaKachhadiya/RSS-to-JSON for documentation")
});
app.get('/api', async (req, res) => {
  try {
    const url = req.query.url;
    if (!url) {
      return res.status(400).json({ error: 'Missing RSS URL' });
    }

    const feed = await parseRSS(url);
    res.json(feed);
  } catch (error) {
    console.error('Error during RSS parsing:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to parse RSS
async function parseRSS(url) {
  const parser = new Parser(); // Instantiate the parser
  try {
    const feed = await parser.parseURL(url);
    return feed;
  } catch (error) {
    throw new Error('Error parsing RSS: ' + error.message);
  }
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


module.exports = app;