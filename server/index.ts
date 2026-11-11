import http from "node:http";
import { readFile } from "node:fs/promises";
import path from "node:path";

const PORT = 3000;
const PUBLIC_DIR = path.resolve(process.cwd(), "public");

const TYPES: Record<string, string> = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

function sendText(res: http.ServerResponse, status: number, message: string) {
  res.writeHead(status, { "Content-Type": "text/plain; charset=utf-8" });
  res.end(message);
}

/**
 * Turns a request URL into an absolute file path inside PUBLIC_DIR.
 * Returns null if the URL is malformed or points outside PUBLIC_DIR.
 */
function resolvePublicPath(rawUrl: string): string | null {
  let pathname: string;
  try {
    // Drops the query string and hash, e.g. "/index.html?x=1" -> "/index.html".
    pathname = decodeURIComponent(new URL(rawUrl, "http://localhost").pathname);
  } catch {
    return null; // malformed URL or bad percent-encoding
  }

  if (pathname.includes("\0")) return null;
  if (pathname.endsWith("/")) pathname += "index.html";

  const filePath = path.resolve(PUBLIC_DIR, "." + pathname);

  // Blocks path traversal: the resolved path must stay inside PUBLIC_DIR.
  if (!filePath.startsWith(PUBLIC_DIR + path.sep)) return null;

  return filePath;
}

const server = http.createServer(async (req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    res.setHeader("Allow", "GET, HEAD");
    return sendText(res, 405, "405 — method not allowed");
  }

  const filePath = resolvePublicPath(req.url ?? "/");
  if (!filePath) return sendText(res, 400, "400 — bad request");

  try {
    const content = await readFile(filePath);
    const type = TYPES[path.extname(filePath).toLowerCase()] ?? "application/octet-stream";
    res.writeHead(200, {
      "Content-Type": type,
      "Content-Length": content.length,
      "X-Content-Type-Options": "nosniff",
    });
    res.end(req.method === "HEAD" ? undefined : content);
  } catch (err) {
    const code = (err as NodeJS.ErrnoException).code;
    if (code === "ENOENT" || code === "EISDIR" || code === "ENOTDIR") {
      return sendText(res, 404, "404 — not found");
    }
    console.error(err);
    sendText(res, 500, "500 — internal server error");
  }
});

server.listen(PORT, () => {
  console.log(`Servidor Bueno's Dias em http://localhost:${PORT}`);
});
