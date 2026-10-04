const express = require('express');
const cors = require('cors');

const app = express();

// Enable permissive CORS so older browsers and native apps never get blocked
app.use(cors({ origin: '*' }));

// Parse standard JSON request bodies
app.use(express.json());

// 1. Root / Health check route
app.get('/', (req, res) => {
  res.status(200).json({
    status: "ok",
    message: "Universal API is online and reachable globally! 🌐✨",
    timestamp: new Date().toISOString()
  });
});

// 2. Authentication route (accepts any email/password and returns a valid session token)
app.post('/api/v0/users/login', (req, res) => {
  console.log("Incoming login request payload:", req.body);

  const email = req.body.email || req.body.username || "anonymous";

  res.status(200).json({
    code: 0,
    msg: "success",
    data: {
      token: "custom_bearer_token_999888777",
      user: {
        id: "usr_1001",
        email: email,
        name: "Retro User"
      }
    }
  });
});

// 3. Chat / Completion endpoint
app.post('/api/v0/chat/completions', (req, res) => {
  console.log("Incoming prompt:", req.body);

  res.status(200).json({
    code: 0,
    choices: [
      {
        message: {
          role: "assistant",
          content: "Hello from your universal backend proxy! 🤖💬"
        }
      }
    ]
  });
});

// Export handler for Vercel Serverless environment
module.exports = app;
