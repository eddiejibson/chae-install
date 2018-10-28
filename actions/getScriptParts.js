/*
 * @Project: chae-install
 * @Created Date: Sunday, October 28th 2018, 12:36:50 pm
 * @Author: Edward Jibson
 * @Last Modified Time: October 28th 2018, 2:49:07 pm
 * @Last Modified By: Edward Jibson
 * @Copyright: (c) 2018 Oxro Holdings LLC
 */

const install = require("../install.json"),
    Promise = require("bluebird");

var getPreInstallPart = ((packages) => {
    return new Promise((resolve, reject) => {
        let script = `#!/bin/bash\n\necho -e "Performing pre-installation tasks...\\n"\necho -e "Updating Package List...\\n"\napt-get update`;
        resolve(script)
    });

});

var getInstallPart = ((packages, script = ``) => {
    return new Promise((resolve, reject) => {
        script += `\necho -e "Installing Packages...\\n"`;
        Promise.each(packages, function (package) {
            if (install.packages[package]) {
                console.log(install.packages[package].cmds)
                Promise.each(install.packages[package].cmds, function (cmds) {
                    console.log(cmds);
                    script += `\n${cmds}`;
                });
            }
        }).then(function () {
            resolve(script);
        });
    });
});

module.exports = {
    "getPreInstallPart": getPreInstallPart,
    "getInstallPart": getInstallPart
}