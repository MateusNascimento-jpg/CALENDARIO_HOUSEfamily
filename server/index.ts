import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

const PORT = 3000;
const PUBLIC_DIR = path.join(process.cwd(), "public");

const TYPES: Record<string, string> = {
  ".html": "text/html",
  ".css": "text/css",
  ".js": "text/javascript",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const server = http.createServer(async (req, res) => {
  const urlPath = req.url === "/" ? "/index.html" : req.url ?? "/index.html";
  const filePath = path.join(PUBLIC_DIR, urlPath);

  try {
    const content = await readFile(filePath);
    const type = TYPES[path.extname(filePath)] ?? "text/plain";
    res.writeHead(200, { "Content-Type": type });
    res.end(content);
  } catch {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 — not found");
  }
});

server.listen(PORT, () => {
  console.log(`Servidor Bueno's Dias em http://localhost:${PORT}`);
});