const fs = require('fs');

const file = () => {
    const data = fs.readFileSync("./sample.json", "utf8");
    const users = JSON.parse(data);
    return JSON.stringify(users);
};

module.exports = { file };