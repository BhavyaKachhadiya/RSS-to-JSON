# RSS to JSON API Documentation

## Introduction
Welcome to the RSS to JSON API documentation. This API allows you to convert RSS feeds to JSON format. The API is built using Node.js with Express and utilizes the 'rss-parser' library for parsing RSS feeds.

## For GUI Based API Interact
[GUI](http://rss-to-json-bhavya.vercel.app/api-docs/)

## Base URL
```
http://rss-to-json-bhavya.vercel.app
```


## Endpoints
### Convert RSS to JSON
- **Endpoint:** `/api`
- **Method:** `GET`
- **Parameters:**
  - `url`: The URL of the RSS feed to convert.

## Example
```
http://rss-to-json-bhavya.vercel.app/api?url=https://example.com/rss-feed
```
## Response
The API responds with a JSON representation of the RSS feed.

```json
{
  "items": [
    {
      "creator": "PavanButke",
      "title": "Space Complexity for Java Dev : Beginners",
      "link": "https://dev.to/dashgriva/space-complexity-for-java-dev-beginners-5688",
      "pubDate": "Sun, 07 Jan 2024 06:41:02 +0000",
      "dc:creator": "PavanButke",
      "content": "Here some content From API",
      "contentSnippet": "Here some content From API",
      "guid": "https://dev.to/dashgriva/space-complexity-for-java-dev-beginners-5688",
      "isoDate": "2024-01-07T06:41:02.000Z"
    }
  ]
}
```
