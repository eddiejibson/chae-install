/*
 * @Project: chae-install
 * @Created Date: Monday, October 29th 2018, 9:14:51 pm
 * @Author: Edward Jibson
 * @Last Modified Time: October 30th 2018, 10:20:46 pm
 * @Last Modified By: Edward Jibson
 * @Copyright: (c) 2018 Oxro Holdings LLC
 */

const dayjs = require("dayjs"),
    fs = require("fs"),
    ejs = require("ejs"),
    install = require("../install.json"),
    config = require("../config.json");
var build = (() => {
    return new Promise((resolve, reject) => {
        let defaultDir = `${__dirname}/../build`
        fs.readFile(`${__dirname}/../views/index.ejs`, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                let template = ejs.compile(data, 'utf8'),
                    html = template({
                        "install": install
                    });
                fs.writeFile(`${ config.buildDirectory || defaultDir}/index.html`, html, (err) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(html);
                    }
                });
            }
        });
    })
});
build().then((res) => {
    if (res) {
        console.log(`Built index.html.`)
    } else {
        console.log("No result was returned... Assuming index.html was not built.")
    }
}).catch((err) => {
    console.error("There was an error building the index.html file", err);
})