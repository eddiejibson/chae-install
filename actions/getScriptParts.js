/*
 * @Project: chae-install
 * @Created Date: Sunday, October 28th 2018, 12:36:50 pm
 * @Author: Edward Jibson
 * @Last Modified Time: October 29th 2018, 4:24:34 pm
 * @Last Modified By: Edward Jibson
 * @Copyright: (c) 2018 Oxro Holdings LLC
 */

const install = require("../install.json"),
    Promise = require("bluebird");

var getPreInstallPart = ((packages) => {
    return new Promise((resolve, reject) => {
        let ppa = false;
        let script = `#!/bin/bash\necho -e "Performing pre-installation tasks..."\necho -e "Updating Package List..."\napt-get update\necho -e "Installing Dependencies..."\napt-get install software-properties-common -y\necho -e "Adding PPAs"`;
        Promise.each(packages, (package) => {
            if (install.packages[package]) {
                if (install.packages[package].ppa) {
                    ppa = true;
                    script += `\n${install.packages[package].ppa}`;
                }
            }
        }).then(() => {
            if (ppa) {
                resolve(script += `\necho -e "Updating package list again because of PPAs that have been added..."\napt-get update`);
            } else {
                resolve(script += `\necho -e "No PPAs needed to be added... Ignoring."`);
            }
        });
    });
});

var getInstallPart = ((packages, script = ``) => {
    return new Promise((resolve, reject) => {
        script += `\necho -e "Installing Packages..."`;
        Promise.each(packages, (package) => {
            if (install.packages[package]) {
                Promise.each(install.packages[package].cmds, (cmd) => {
                    script += `\n${cmds}`;
                });
            } else {
                if (package.indexOf("-" > -1)) { //All children are named with the convention "parentPackage-subPackage"
                    let parentPackage = package.split("-");
                    if (install.packages[parentPackage[0]].children) {
                        if (install.packages[parentPackage[0]].children[package]) {
                            Promise.each(install.packages[parentPackage[0]].children[package].cmds, (cmd) => {
                                script += `\n${cmd}`;
                            });
                        }
                    }
                }
            }
        }).then(() => {
            resolve(script += `\necho -e "Complete. Thank-you for using install.chae.sh."`);
        });
    });
});

module.exports = {
    "getPreInstallPart": getPreInstallPart,
    "getInstallPart": getInstallPart
}