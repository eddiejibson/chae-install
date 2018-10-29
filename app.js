/*
 * @Project: install
 * @Created Date: Saturday, October 27th 2018, 7:54:15 pm
 * @Author: Edward Jibson
 * @Last Modified Time: October 27th 2018, 11:34:35 pm
 * @Last Modified By: Edward Jibson
 * @Copyright: (c) 2018 Oxro Holdings LLC
 */

const express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    morgan = require("morgan"),
    config = require("./config.json"),
    Sentry = require('@sentry/node'),
    scriptGenerator = require("./routes/scriptGenerator.js");

Sentry.init({
    dsn: config.sentry.dsn
});

app.use(Sentry.Handlers.requestHandler());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json()); //Parse json



app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, CF-Connecting-IP");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.use(scriptGenerator);
app.use(Sentry.Handlers.errorHandler());

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