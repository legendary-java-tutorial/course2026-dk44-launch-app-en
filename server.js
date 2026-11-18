// Starter app of module 6: a page with the version text and a visit counter in the /data volume.
// The /crash route ends the process with code 1 — for experiments with the restart policy (level 47).
const http = require("http");
const fs = require("fs");

const PORT = 3000;
const file = "/data/counter.txt";
const greeting = "Hello from Release Day!";

function readCount() {
  if (!fs.existsSync(file)) {
    return 0;
  }
  return Number(fs.readFileSync(file, "utf8")) || 0;
}

// Without write access to the volume the app has no reason to run: exit with code 1, the restart policy will bring it up again
try {
  fs.writeFileSync(file, String(readCount()));
} catch (err) {
  console.log("Cannot write the counter: " + err.code + " " + file);
  process.exit(1);
}

http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain; charset=utf-8");
  if (req.url === "/crash") {
    console.log("Route /crash: the process exits with code 1");
    res.end("Failure on request\n");
    setTimeout(() => process.exit(1), 50);
    return;
  }
  const count = readCount() + 1;
  fs.writeFileSync(file, String(count));
  res.end(greeting + " Visits: " + count + "\n");
}).listen(PORT, () => {
  console.log("App is listening on port " + PORT);
});
