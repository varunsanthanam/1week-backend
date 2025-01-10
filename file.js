// // const fs = require('fs');

// // const file = () => {
// //     const data = fs.readFileSync("./sample.json", "utf8");
// //     const users = JSON.parse(data);
// //     return JSON.stringify(users);
// // };

// // module.exports = { file };
// const fs=require("fs");
// const http=require("http");
// fs.readFile("./sample")
const fs = require("fs"); 
const http = require("http"); 
fs.readFile("./sample.json", "utf8", (err, data) => { 
    if (err) { 
        console.log("Cannot Open File"); 
        return; 
    }
        const jsonData = JSON.parse(data); 
        const filteredData = jsonData.filter((user) => user.amount > 1500); 
        fs.writeFile("./data.json", JSON.stringify(filteredData), (err) => {
             if (err) { 
                console.log("Error Writing File"); 
                return; 
            }
        });
     });
     