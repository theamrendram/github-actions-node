const request = require("supertest");
const app = require("./server");

describe("Express Server", () => {
  describe("Health Check Endpoint", () => {
    test("GET /health should return 200 and server status", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.body).toHaveProperty("status", "OK");
      expect(response.body).toHaveProperty("message", "Server is running");
      expect(response.body).toHaveProperty("timestamp");
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });
  });

  describe("Hello Endpoint", () => {
    test("GET /api/hello should return hello message", async () => {
      const response = await request(app).get("/api/hello").expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "Hello from Express server!"
      );
      expect(response.body).toHaveProperty("timestamp");
      expect(new Date(response.body.timestamp)).toBeInstanceOf(Date);
    });
  });   

  describe("User Endpoints", () => {
    test("POST /api/users should create a new user with valid data", async () => {
      const userData = {
        name: "John Doe",
        email: "john@example.com",
      };

      const response = await request(app)
        .post("/api/users")
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty("id");
      expect(response.body).toHaveProperty("name", userData.name);
      expect(response.body).toHaveProperty("email", userData.email);
      expect(response.body).toHaveProperty("createdAt");
      expect(new Date(response.body.createdAt)).toBeInstanceOf(Date);
    });

    test("POST /api/users should return 400 when name is missing", async () => {
      const userData = {
        email: "john@example.com",
      };

      const response = await request(app)
        .post("/api/users")
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty(
        "error",
        "Name and email are required"
      );
    });

    test("POST /api/users should return 400 when email is missing", async () => {
      const userData = {
        name: "John Doe",
      };

      const response = await request(app)
        .post("/api/users")
        .send(userData)
        .expect(400);

      expect(response.body).toHaveProperty(
        "error",
        "Name and email are required"
      );
    });

    test("POST /api/users should return 400 when both name and email are missing", async () => {
      const response = await request(app)
        .post("/api/users")
        .send({})
        .expect(400);

      expect(response.body).toHaveProperty(
        "error",
        "Name and email are required"
      );
    });

    test("GET /api/users/:id should return user data", async () => {
      const userId = 123;

      const response = await request(app)
        .get(`/api/users/${userId}`)
        .expect(200);

      expect(response.body).toHaveProperty("id", userId);
      expect(response.body).toHaveProperty("name", "John Doe");
      expect(response.body).toHaveProperty("email", "john@example.com");
      expect(response.body).toHaveProperty("createdAt");
      expect(new Date(response.body.createdAt)).toBeInstanceOf(Date);
    });
  });

  describe("Calculator Endpoints", () => {
    describe("Addition", () => {
      test("GET /api/calculator/add should add two numbers correctly", async () => {
        const response = await request(app)
          .get("/api/calculator/add")
          .query({ a: 5, b: 3 })
          .expect(200);

        expect(response.body).toHaveProperty("operation", "addition");
        expect(response.body).toHaveProperty("a", 5);
        expect(response.body).toHaveProperty("b", 3);
        expect(response.body).toHaveProperty("result", 8);
      });

      test("GET /api/calculator/add should handle decimal numbers", async () => {
        const response = await request(app)
          .get("/api/calculator/add")
          .query({ a: 5.5, b: 3.2 })
          .expect(200);

        expect(response.body).toHaveProperty("result", 8.7);
      });

      test("GET /api/calculator/add should return 400 when parameter a is missing", async () => {
        const response = await request(app)
          .get("/api/calculator/add")
          .query({ b: 3 })
          .expect(400);

        expect(response.body).toHaveProperty(
          "error",
          "Both a and b parameters are required"
        );
      });

      test("GET /api/calculator/add should return 400 when parameter b is missing", async () => {
        const response = await request(app)
          .get("/api/calculator/add")
          .query({ a: 5 })
          .expect(400);

        expect(response.body).toHaveProperty(
          "error",
          "Both a and b parameters are required"
        );
      });

      test("GET /api/calculator/add should return 400 when both parameters are missing", async () => {
        const response = await request(app)
          .get("/api/calculator/add")
          .expect(400);

        expect(response.body).toHaveProperty(
          "error",
          "Both a and b parameters are required"
        );
      });

      test("GET /api/calculator/add should return 400 when a is not a valid number", async () => {
        const response = await request(app)
          .get("/api/calculator/add")
          .query({ a: "invalid", b: 3 })
          .expect(400);

        expect(response.body).toHaveProperty(
          "error",
          "Both a and b must be valid numbers"
        );
      });

      test("GET /api/calculator/add should return 400 when b is not a valid number", async () => {
        const response = await request(app)
          .get("/api/calculator/add")
          .query({ a: 5, b: "invalid" })
          .expect(400);

        expect(response.body).toHaveProperty(
          "error",
          "Both a and b must be valid numbers"
        );
      });
    });

    describe("Multiplication", () => {
      test("GET /api/calculator/multiply should multiply two numbers correctly", async () => {
        const response = await request(app)
          .get("/api/calculator/multiply")
          .query({ a: 5, b: 3 })
          .expect(200);

        expect(response.body).toHaveProperty("operation", "multiplication");
        expect(response.body).toHaveProperty("a", 5);
        expect(response.body).toHaveProperty("b", 3);
        expect(response.body).toHaveProperty("result", 15);
      });

      test("GET /api/calculator/multiply should handle decimal numbers", async () => {
        const response = await request(app)
          .get("/api/calculator/multiply")
          .query({ a: 5.5, b: 2 })
          .expect(200);

        expect(response.body).toHaveProperty("result", 11);
      });

      test("GET /api/calculator/multiply should return 400 when parameter a is missing", async () => {
        const response = await request(app)
          .get("/api/calculator/multiply")
          .query({ b: 3 })
          .expect(400);

        expect(response.body).toHaveProperty(
          "error",
          "Both a and b parameters are required"
        );
      });

      test("GET /api/calculator/multiply should return 400 when parameter b is missing", async () => {
        const response = await request(app)
          .get("/api/calculator/multiply")
          .query({ a: 5 })
          .expect(400);

        expect(response.body).toHaveProperty(
          "error",
          "Both a and b parameters are required"
        );
      });

      test("GET /api/calculator/multiply should return 400 when both parameters are missing", async () => {
        const response = await request(app)
          .get("/api/calculator/multiply")
          .expect(400);

        expect(response.body).toHaveProperty(
          "error",
          "Both a and b parameters are required"
        );
      });

      test("GET /api/calculator/multiply should return 400 when a is not a valid number", async () => {
        const response = await request(app)
          .get("/api/calculator/multiply")
          .query({ a: "invalid", b: 3 })
          .expect(400);

        expect(response.body).toHaveProperty(
          "error",
          "Both a and b must be valid numbers"
        );
      });

      test("GET /api/calculator/multiply should return 400 when b is not a valid number", async () => {
        const response = await request(app)
          .get("/api/calculator/multiply")
          .query({ a: 5, b: "invalid" })
          .expect(400);

        expect(response.body).toHaveProperty(
          "error",
          "Both a and b must be valid numbers"
        );
      });
    });
  });

  describe("Error Handling", () => {
    test("GET /nonexistent should return 404", async () => {
      const response = await request(app).get("/nonexistent").expect(404);

      expect(response.body).toHaveProperty("error", "Route not found");
    });

    test("POST /nonexistent should return 404", async () => {
      const response = await request(app).post("/nonexistent").expect(404);

      expect(response.body).toHaveProperty("error", "Route not found");
    });
  });

  describe("Middleware", () => {
    test("should include CORS headers", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.headers).toHaveProperty("access-control-allow-origin");
    });

    test("should include security headers from helmet", async () => {
      const response = await request(app).get("/health").expect(200);

      expect(response.headers).toHaveProperty("x-content-type-options");
      expect(response.headers).toHaveProperty("x-frame-options");
    });
  });
});
