/*
 * @Project: chae-install
 * @Created Date: Saturday, October 27th 2018, 11:33:33 pm
 * @Author: Edward Jibson
 * @Last Modified Time: October 29th 2018, 4:26:39 pm
 * @Last Modified By: Edward Jibson
 * @Copyright: (c) 2018 Oxro Holdings LLC
 */
const express = require("express"),
    router = express.Router(),
    getScriptParts = require("../actions/getScriptParts");

router.get("/:packages", (req, res, next) => {
    let userPackages = req.params.packages.split(",");
    getScriptParts.getPreInstallPart(userPackages).then((script) => {
        getScriptParts.getInstallPart(userPackages, script).then((script) => {
            return res.set('Content-Type', 'text/plain').status(200).send(script)
        });
    });
});

module.exports = router;