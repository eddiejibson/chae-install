const express = require("express"),
    router = express.Router(),
    getScriptParts = require("../actions/getScriptParts");

router.get("/:packages", (req, res, next) => {
    let packages = String(req.params.packages).toLowerCase().split(",");
    let script;
    let parts = getScriptParts.getPreInstallPart(packages);
    script = parts.script;
    packages = parts.packages;
    script = getScriptParts.getInstallPart(packages, script)
    return res.set('Content-Type', 'text/plain').status(200).send(script)
});

module.exports = router;