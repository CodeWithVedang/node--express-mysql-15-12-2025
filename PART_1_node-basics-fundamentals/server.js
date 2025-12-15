// Import built-in and external modules
import http from "http";                                    // Node.js HTTP module for creating a server
import dotenv from "dotenv";                                // dotenv for loading environment variables from .env file
import { readFile, writeFile } from "./fileOps.js";         // Custom file operations (read/write)
import { fileURLToPath } from "url";                        // Utility to convert file URL to path
import path from "path";                                    // Path module for handling file and directory paths

// Fix __dirname in ES Modules (since __dirname is not available by default in ESM)
const __filename = fileURLToPath(import.meta.url);          // Get current file path
const __dirname = path.dirname(__filename);                 // Get current directory path

dotenv.config();                                            // Load environment variables from .env file
const PORT = process.env.PORT || 4000;                      // Define server port (from environment variable or fallback to 4000)

// Log useful runtime information
console.log("Current directory:", __dirname);
console.log("Process ID:", process.pid);
console.log("Message:", process.env.MESSAGE);

// Create HTTP server
const server = http.createServer(async (req, res) => {
    console.log(`${req.method} ${req.url}`);                  // Log incoming request method and URL

    // Handle root route (GET /)
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Welcome to Node.js Fundamentals!");
    }

    // Handle file read route (GET /read)
    else if (req.url === "/read") {
        const data = await readFile(); // Call custom readFile function
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(data); // Send file contents as response
    }

    // Handle file write route (POST /write)
    else if (req.url === "/write" && req.method === "POST") {
        await writeFile("This text was written using fs.writeFile! hello vedang"); // Write to file
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("File written successfully!");
    }

    // Handle unknown routes (404 Not Found)
    else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("404 Not Found");
    }
});

// Start server and listen on defined port
server.listen(PORT, () =>
    console.log(`🚀 Server running at http://localhost:${PORT}`)
);