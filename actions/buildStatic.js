/*
 * @Project: chae-install
 * @Created Date: Monday, October 29th 2018, 9:14:51 pm
 * @Author: Edward Jibson
 * @Last Modified Time: October 31st 2018, 12:24:25 am
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
                if (!fs.existsSync(`${ config.buildDirectory || defaultDir}/css/`)) {
                    fs.mkdirSync(`${ config.buildDirectory || defaultDir}/css/`);
                }
                if (!fs.existsSync(`${ config.buildDirectory || defaultDir}/js/`)) {
                    fs.mkdirSync(`${ config.buildDirectory || defaultDir}/js/`);
                }
                fs.createReadStream(`${__dirname}/../static/css/app.css`).pipe(fs.createWriteStream(`${ config.buildDirectory || defaultDir}/css/app.css`));
                fs.createReadStream(`${__dirname}/../static/js/app.js`).pipe(fs.createWriteStream(`${ config.buildDirectory || defaultDir}/js/app.js`));
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