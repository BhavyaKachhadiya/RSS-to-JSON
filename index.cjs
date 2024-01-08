const express = require('express');
const Parser = require('rss-parser'); // Note: Use 'rss-parser' instead of 'parser'
const cors = require('cors');
const path = require("path");
import morgan from "morgan";
import bodyParser from "body-parser";
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');
const app = express();
const PORT = 3000;

app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname,'views')))
// Middleware to parse JSON
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// API endpoint to convert RSS to JSON
app.get('/', async (req, res) => {
  res.render('index.html')
});
app.get('/api', async (req, res) => {
  try {
    const url = req.query.url || 'https://dev.to/rss';
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

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'RSS to JSON API',
      version: '1.0.0',
      description: 'Converts RSS feeds to JSON format.',
    },
  },
  servers: [
    {
      url: "https://rss-to-json-bhavya.vercel.app/",
      description: "My API Documentation",
    },
  ],
  apis: ['index.cjs'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// API endpoint to convert RSS to JSON
/**
 * @openapi
 * /api:
 *   get:
 *     summary: Convert RSS to JSON
 *     description: Endpoint to convert an RSS feed to JSON format.
 *     parameters:
 *       - in: query
 *         name: url
 *         required: false
 *         description: |
 *           The URL of the RSS feed to convert. If not provided, a default URL will be used.
 *           Default URL: `https://dev.to/rss`.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response with JSON representation of the RSS feed.
 *       400:
 *         description: Bad request. Missing RSS URL.
 *       500:
 *         description: Internal Server Error.
 */

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