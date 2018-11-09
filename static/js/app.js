"use strict";
/*
 * @Project: chae-install
 * @Created Date: Monday, October 29th 2018, 6:31:05 pm
 * @Author: Edward Jibson
 * @Last Modified Time: November 9th 2018, 7:42:48 pm
 * @Last Modified By: Edward Jibson
 * @Copyright: (c) 2018 Oxro Holdings LLC
 */
var packages = [];
let children = {};
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
                        if (!children[parent[0].name]) {
                            children[parent[0].name] = []
                        }
                        children[parent[0].name].push(this.name);
                        if (packages.indexOf(parent[0].name) > -1) {
                            push([this.name]);
                        } else {
                            push([parent[0].name, this.name]);
                        }
                    }
                } else {
                    push([this.name]);
                }
            } else {
                if (children[this.name]) {
                    console.log("exit")
                    removeFromUrl([children[this.name]]);
                    removeChildren([children[this.name]], this.name);
                }
                removeFromUrl([this.name]);
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

const push = ((array) => {
    array.forEach(item => {
        packages.push(item)
    });
    updateUrl();
});

const removeFromUrl = ((array) => {
    array.forEach((item) => {
        let i = packages.indexOf(item);
        if (i <= 0) {
            packages = [];
            installUrl.value = "Select packages below to create the URL";
        } else {
            packages.splice(packages.indexOf(item), 1);
            updateUrl();
        }
    });
});

const removeChildren = ((array, name) => {
    array.forEach(item => {
        let child = document.getElementsByName(item);
        child[0].checked = false;
        children[name] = [];
    });
});

const updateUrl = (() => {
    let packageString = packages.join();
    installUrl.value = `wget -qO- https://install.chae.sh/${packageString}`;
});