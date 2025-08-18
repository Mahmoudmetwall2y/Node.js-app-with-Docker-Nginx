const express = require("express");
const os = require("os");
const app = express();
const PORT = 3000;

const ENV = process.env.NODE_ENV || "development";
const getTimestamp = () => new Date().toLocaleString();

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Node App - ${ENV}</title>
      <style>
        html, body {
          height: 100%;
          margin: 0;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: ${ENV === "production" ? "#f5f5f5" : "#e3f2fd"};
          color: #333;
        }
        body {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container {
          text-align: center;
          padding: 20px 30px;
          border-radius: 10px;
          background: white;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          max-width: 350px;
        }
        h1 {
          font-size: 1.6rem;
          margin-bottom: 10px;
          color: ${ENV === "production" ? "#d32f2f" : "#1976d2"};
        }
        .info {
          font-size: 0.9rem;
          margin: 6px 0;
        }
        .badge {
          display: inline-block;
          padding: 4px 10px;
          border-radius: 15px;
          background: ${ENV === "production" ? "#d32f2f" : "#1976d2"};
          color: white;
          font-weight: bold;
          margin-top: 8px;
        }
        footer {
          font-size: 0.75rem;
          color: #555;
          margin-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🚀 Node App</h1>
        <p class="info">Environment: <span class="badge">${ENV.toUpperCase()}</span></p>
        <p class="info">Node Version: ${process.version}</p>
        <p class="info">Hostname: ${os.hostname()}</p>
        <p class="info">Time: ${getTimestamp()}</p>
        <footer>&copy; ${new Date().getFullYear()} Mahmoud-Metwally</footer>
      </div>
    </body>
    </html>
  `);
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    environment: ENV,
    timestamp: getTimestamp(),
    hostname: os.hostname(),
  });
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Node app running on port ${PORT} in ${ENV} mode!`)
);
