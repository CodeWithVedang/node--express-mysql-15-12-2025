import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "largeFile.txt");

// Create a read stream
const stream = fs.createReadStream(filePath, { encoding: "utf-8" });

stream.on("data", (chunk) => {
  console.log("Received chunk:", chunk.length);
});

stream.on("end", () => console.log("Stream finished reading file."));

stream.on("error", (err) => console.log("Stream error:", err));
