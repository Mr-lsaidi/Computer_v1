const chalk = require("chalk");
const express = require("express");
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors({origin: '*'}));

function graph(states){
    app.get('/', function (req, res) {
        res.sendFile(path.join(__dirname + '/index.html'))
    });

    app.get('/states', function(req, res) {
        res.send(states);
    });

    app.listen(8080);
    console.log(`Server listen on the port ${8080}`);
    console.log(chalk.green('Go To http://localhost:8080/'));
}

module.exports = {
    graph
}