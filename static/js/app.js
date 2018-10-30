"use strict";
/*
 * @Project: chae-install
 * @Created Date: Monday, October 29th 2018, 6:31:05 pm
 * @Author: Edward Jibson
 * @Last Modified Time: October 30th 2018, 8:27:59 pm
 * @Last Modified By: Edward Jibson
 * @Copyright: (c) 2018 Oxro Holdings LLC
 */
var packages = 0;
document.addEventListener("DOMContentLoaded", function (event) {
    var installUrl = document.getElementById("installUrl")
    var checkbox = document.querySelectorAll("input[type=checkbox]");
    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('change', function (event) {
            if (this.checked) {
                if (this.id) {
                    if (this.id == "child") {
                        let parent = document.getElementsByName(this.getAttribute('data-parent'));

                        parent[0].checked = true;
                        console.log(installUrl.value)
                        if (installUrl.value.includes(parent[0].name)) {
                            changeUrl(this.name);
                        } else {
                            changeUrl(`${parent[0].name},${this.name}`);
                            packages++;
                        }
                    }
                } else {
                    changeUrl(this.name);
                }
                packages++;
            } else {
                if (packages - 1 == 0) {
                    installUrl.value = "Select packages below to create the URL"; //Back to default value
                } else {
                    installUrl.value = installUrl.value.replace(`,${this.name}`, "");
                }
                packages--;
            }
        });
    }
});

var changeUrl = ((string) => {
    console.log(packages);
    if (packages) {
        installUrl.value += `,${string}`;
    } else {
        installUrl.value = `https://install.chae.sh/${string}`;
    }
});