/*
 * @Project: chae-install
 * @Created Date: Saturday, October 27th 2018, 11:33:33 pm
 * @Author: Edward Jibson
 * @Last Modified Time: October 28th 2018, 2:40:13 pm
 * @Last Modified By: Edward Jibson
 * @Copyright: (c) 2018 Oxro Holdings LLC
 */
const express = require("express"),
    router = express.Router(),
    packages = require("../install.json"),
    getScriptParts = require("../actions/getScriptParts");



router.get("/:packages", (req, res, next) => {
    let userPackages = req.params.packages.split(",");
    let script = ``
    getScriptParts.getPreInstallPart(userPackages).then((script) => {
        getScriptParts.getInstallPart(userPackages, script).then((script) => {
            return res.set('Content-Type', 'text/plain').status(200).send(script)
        });
    });





});

module.exports = router;