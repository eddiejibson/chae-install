/*
 * @Project: install
 * @Created Date: Saturday, October 27th 2018, 7:54:15 pm
 * @Author: Edward Jibson
 * @Last Modified Time: October 30th 2018, 10:03:29 pm
 * @Last Modified By: Edward Jibson
 * @Copyright: (c) 2018 Oxro Holdings LLC
 */

const express = require("express"),
    app = express(),
    morgan = require("morgan"),
    config = require("./config.json"),
    scriptGenerator = require("./routes/scriptGenerator.js"),
    install = require("./install.json");

app.use(express.static(__dirname + '/static'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

if (!config.production) {
    app.set('view engine', 'ejs'); //SHOULD NOT BE USED IN PRODUCTION. BUILD THE HTML FILE INSTEAD
    app.get('/', (req, res) => {
        res.render('index', {
            "install": install
        });
    });
}

app.use(scriptGenerator); //Pass to script generator route 

app.use((req, res, next) => {
    return res.status(404).json({
        "error": "Not found"
    });
});

app.listen(config.server.port, (err) => {
    if (err) {
        console.log(`Could not start server: ${err}`);
        process.exit(0);
    } else {
        console.log(`Server started on port ${config.server.port} and listening for requests.`);
    }
})