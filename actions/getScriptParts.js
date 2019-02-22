const install = require("../install.json");

var getPreInstallPart = ((packages) => {
    let ppa = false;
    let script = `#!/bin/bash\necho -e "Performing pre-installation tasks..."\necho -e "Updating Package List..."\napt-get update\necho -e "Installing Dependencies..."\napt-get install software-properties-common -y\necho -e "Adding PPAs"`;
    packages.forEach(package => {
        if (install.packages[package]) {
            if (install.packages[package].ppa) {
                ppa = true;
                script += `\n${install.packages[package].ppa}`;
            }
        } else {
            if (package.indexOf("-" > -1)) { //All children are named with the convention "parentPackage-subPackage"
                let parentPackage = package.split("-")[0];
                if (packages.indexOf(parentPackage) <= -1 && install.packages[parentPackage]) {
                    packages.unshift(parentPackage);
                    if (install.packages[parentPackage].ppa) {
                        ppa = true;
                        script += `\n${install.packages[parentPackage].ppa}`;
                    }
                }
            }
        }
    });
    if (ppa) {
        return {
            script: (script += `\necho -e "Updating package list again because of PPAs that have been added..."\napt-get update`),
            packages: packages //Incase we found a parent package was not included, we add it and must return.
        };
    } else {
        return {
            script: (script += `\necho -e "No PPAs needed to be added... Ignoring."`),
            packages: packages
        };
    }
});

var ifDetails = ((package) => { //looks stupid rn but adding various things like setting passwords
    for (let i = 0; i < package.length; i++) {
        let aPackage = package[i];
        if (install.packages[aPackage]) {
            if (install.packages[aPackage].details) {
                return true;
            }
        }
    }
    return false;
});

var getInstallPart = ((packages, script = ``) => {
    script += `\necho -e "Installing Packages..."`;
    packages.forEach(package => {
        if (install.packages[package]) {
            install.packages[package].cmds.forEach(cmd => {
                script += `\n${cmd}`;
            });
        } else {
            if (package.indexOf("-" > -1)) { //All children are named with the convention "parentPackage-subPackage"
                let parentPackage = package.split("-")[0];
                if (install.packages[parentPackage] && install.packages[parentPackage].children) {
                    if (install.packages[parentPackage].children[package]) {
                        install.packages[parentPackage].children[package].cmds.forEach(cmd => {
                            script += `\n${cmd}`;
                        });
                    }
                }
            }
        }
    });
    if (ifDetails(packages)) {
        return (script += `\necho -e "Complete. Thank-you for using install.chae.sh."\necho -e "As some packages you installed reqired some form of action (e.g setting a password), this has been logged to the file /home/details.chae - all information can be found here."`);
    } else {
        return (script += `\necho -e "Complete. Thank-you for using install.chae.sh."`);
    }
});


module.exports = {
    "getPreInstallPart": getPreInstallPart,
    "getInstallPart": getInstallPart
}