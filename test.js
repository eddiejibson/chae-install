/*
 * @Project: chae-install
 * @Created Date: Monday, October 29th 2018, 9:18:37 pm
 * @Author: Edward Jibson
 * @Last Modified Time: October 30th 2018, 6:49:28 pm
 * @Last Modified By: Edward Jibson
 * @Copyright: (c) 2018 Oxro Holdings LLC
 */
const install = require("./install.json")
console.log(Object.keys(install.packages["php7.1"].children))