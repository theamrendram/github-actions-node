# Express Server for GitHub Actions

A basic Express.js server with comprehensive unit tests designed for GitHub Actions CI/CD workflows.

## Features

- ✅ Express.js server with RESTful API endpoints
- ✅ Comprehensive unit tests using Jest and Supertest
- ✅ Security middleware (Helmet, CORS)
- ✅ Request logging with Morgan
- ✅ Error handling and validation
- ✅ Health check endpoint
- ✅ Calculator endpoints for testing
- ✅ User management endpoints

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Run tests:

```bash
npm test
```

## Available Scripts

- `npm start` - Start the production server
- `npm run dev` - Start the development server with nodemon
- `npm test` - Run all tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## API Endpoints

### Health Check

- **GET** `/health` - Server health status

### Hello World

- **GET** `/api/hello` - Simple hello message

### User Management

- **POST** `/api/users` - Create a new user
  - Body: `{ "name": "string", "email": "string" }`
- **GET** `/api/users/:id` - Get user by ID

### Calculator

- **GET** `/api/calculator/add` - Add two numbers
  - Query params: `a` and `b`
- **GET** `/api/calculator/multiply` - Multiply two numbers
  - Query params: `a` and `b`

## Testing

The server includes comprehensive unit tests covering:

- ✅ All API endpoints
- ✅ Request validation
- ✅ Error handling
- ✅ Middleware functionality
- ✅ Response format validation

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Test Coverage

The tests cover:

- Health check endpoint
- Hello endpoint
- User creation and retrieval
- Calculator operations (addition and multiplication)
- Input validation
- Error scenarios
- Middleware functionality

## GitHub Actions Integration

This server is designed to work seamlessly with GitHub Actions. Here's a sample workflow:

```yaml
name: Node.js CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest

    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]

    steps:
      - uses: actions/checkout@v3

      - name: Use Node.js ${{ matrix.node-version }}
        uses: actions/setup-node@v3
        with:
          node-version: ${{ matrix.node-version }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm test

      - name: Run tests with coverage
        run: npm run test:coverage
```

## Environment Variables

- `PORT` - Server port (default: 3000)

## Project Structure

```
github-actions-backend/
├── src/
│   ├── server.js          # Main Express server
│   └── server.test.js     # Unit tests
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Dependencies

### Production

- `express` - Web framework
- `cors` - Cross-origin resource sharing
- `helmet` - Security headers
- `morgan` - HTTP request logger

### Development

- `jest` - Testing framework
- `supertest` - HTTP testing
- `nodemon` - Development server

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

ISC
