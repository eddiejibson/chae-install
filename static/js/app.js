"use strict";
/*
 * @Project: chae-install
 * @Created Date: Monday, October 29th 2018, 6:31:05 pm
 * @Author: Edward Jibson
 * @Last Modified Time: October 30th 2018, 11:48:16 pm
 * @Last Modified By: Edward Jibson
 * @Copyright: (c) 2018 Oxro Holdings LLC
 */
var packages = 0;
var url = "";
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

    var coll = document.getElementsByClassName("collapsible");

    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            console.log(this.nextElementSibling);
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    }

});

var changeUrl = ((string) => {
    if (packages) {
        url += `,${string}`;
    } else {
        url = `wget -qO- https://install.chae.sh/${string}`;
    }
    installUrl.value = `${url} | bash`
});