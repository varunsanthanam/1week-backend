// const http = require("http");
// const fs = require("fs");

// fs.readFile("./sample.json", "utf8", (err, data) => {
//   if (err) {
//     console.log("there is an error in the file ");
//     return;
//   }
//   const users = JSON.parse(data);

//   const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.write(JSON.stringify(users));
//     res.end();
//   });
//   server.listen(3000, () => {
//     console.log("Server is running on http://localhost:3000");
//   });
// });