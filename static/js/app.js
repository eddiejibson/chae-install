/*
 * @Project: chae-install
 * @Created Date: Monday, October 29th 2018, 6:31:05 pm
 * @Author: Edward Jibson
 * @Last Modified Time: October 29th 2018, 9:11:22 pm
 * @Last Modified By: Edward Jibson
 * @Copyright: (c) 2018 Oxro Holdings LLC
 */
document.addEventListener("DOMContentLoaded", function (event) {
    var installUrl = document.getElementById("installUrl")
    var checkbox = document.querySelectorAll("input[type=checkbox]");
    var packages = 0;
    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].addEventListener('click', function (event) {
            if (this.checked) {
                if (packages) {
                    installUrl.value += `,${this.name}`;
                } else {
                    installUrl.value = `https://install.chae.sh/${this.name}`;
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