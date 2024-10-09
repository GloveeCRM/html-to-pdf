# HTML to PDF Generator with API Key and Rate Limiting

## Overview

This project provides an API service that converts HTML content into a PDF file. The service is protected by API key authentication and enforces rate limiting to prevent excessive usage. All requests to the API are logged and tied to an API key, and the rate limit is configurable per API key.

## Features

- **HTML to PDF Conversion**: Converts HTML content to PDF format.
- **API Key Validation**: Only authorized users with a valid API key can access the API.
- **Rate Limiting**: Limits the number of requests an API key can make within a minute.
- **Request Logging**: Logs each request made to the API for auditing purposes.

## Technologies

- **NestJS**: Backend framework.
- **Puppeteer**: Headless browser to generate PDFs.
- **TypeORM**: ORM for managing the SQLite database.
- **Docker**: Containerization for deployment.
- **SQLite**: Lightweight database for API key storage and request logs.

## Live Demo

You can access the live project at: [htmltopdf.glovee.io](https://htmltopdf.glovee.io)

### Demo API Key

For testing purposes, you can use the following API key with a rate limit of 2 requests per minute:

`test-api-key`

## API Endpoints

### 1. Convert HTML to PDF

**Endpoint:**\
`POST /generate-pdf-from-html`

**Headers:**

- `x-api-key`: Your API key (e.g., `test-api-key`)

**Request Body:**

```json
{
  "htmlContent": "<html><body><h1>Hello, World!</h1></body></html>",
  "format": "A4" // (optional, defaults to A4)
}
```

**Response:**

- `Content-Type`: application/pdf
- `Status Code`: 200 OK if successful, returns the PDF as binary data.
- `Status Code`: 403 Forbidden if the API key is missing, invalid, or the rate limit is exceeded.

**Example Request:**

```bash
curl -X POST https://htmltopdf.glovee.io/generate-pdf-from-html \
-H "x-api-key: test-api-key" \
-H "Content-Type: application/json" \
-d '{
  "htmlContent": "<html><body><h1>Hello, World!</h1></body></html>",
  "format": "A4"
}' --output output.pdf
```

## Running the Project

To run the project, ensure you have Docker installed.

1. Clone the repository:

```bash
git clone https://github.com/GloveeCRM/html-to-pdf.git
cd html-to-pdf
```

2. Run the project with Docker:

```bash
docker-compose up --build
```

3. The API will be available at `http://localhost:3000`.

## Repository

The source code for this project is available on GitHub: [html-to-pdf](https://github.com/GloveeCRM/html-to-pdf)
