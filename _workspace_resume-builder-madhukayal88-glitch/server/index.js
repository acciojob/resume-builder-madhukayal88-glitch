/**
 * Minimal persistence server ("database") for the Resume Builder.
 *
 * The React app already persists to localStorage so the Cypress tests work
 * entirely client-side. This tiny server is provided as an optional real
 * backend that stores resumes in a JSON file (data/resume.json).
 *
 *   node server/index.js        ->  http://localhost:5000
 *
 *   GET  /api/resume/:id        -> load a saved resume
 *   POST /api/resume/:id        -> save a resume (JSON body)
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 5000;
const DATA_DIR = path.join(__dirname, "..", "data");
const DATA_FILE = path.join(DATA_DIR, "resume.json");

function readDb() {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
  } catch (e) {
    return {};
  }
}

function writeDb(db) {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

function send(res, status, body) {
  res.writeHead(status, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  });
  res.end(JSON.stringify(body));
}

const server = http.createServer((req, res) => {
  if (req.method === "OPTIONS") return send(res, 204, {});

  const match = req.url.match(/^\/api\/resume\/([\w.-]+)$/);
  if (!match) return send(res, 404, { error: "Not found" });

  const id = match[1];

  if (req.method === "GET") {
    const db = readDb();
    if (!db[id]) return send(res, 404, { error: "No resume found" });
    return send(res, 200, db[id]);
  }

  if (req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const payload = JSON.parse(body || "{}");
        const db = readDb();
        db[id] = payload;
        writeDb(db);
        send(res, 200, { ok: true, id });
      } catch (e) {
        send(res, 400, { error: "Invalid JSON" });
      }
    });
    return;
  }

  send(res, 405, { error: "Method not allowed" });
});

server.listen(PORT, () => {
  console.log(`Resume Builder API running on http://localhost:${PORT}`);
});
