const $_$ = function(sel) {
    if (!(this instanceof $_$)) {
        return new $_$(sel);
    }
    if (sel) {
        if (typeof sel === "string") {
            this.elems = Object.values(document.querySelectorAll(sel));
        } else if (typeof sel === "object" && Object.values(sel).length && !(Array.isArray(sel))) {
            this.elems = Object.values(sel);
        } else {
            this.elems = sel;
        }
    } else {
        this.elems = [];
    }
    return this;
}
$_$.prototype.$ = function() {
    return this.elems;
}
$_$.prototype.Loop = function(func) {
    if (this.elems && typeof this.elems === "number" && typeof func === "function") {
        for (var elm = 0; elm < this.elems; elm++) {
            func(elm);
        }
    }
    return this;
}
$_$.prototype.ForEach = function(func) {
    if (typeof func === "function") {
        for (var elm = 0; elm < this.elems.length; elm++) {
            func(this.elems[elm]);
        }
    }
    return this;
}
$_$.prototype.DeepForEach = function(func) {
    if (typeof func === "function") {
        for (var elm = 0; elm < this.elems.flat(Infinity).length; elm++) {
            func(this.elems.flat(Infinity)[elm]);
        }
    }
    return this;
}
$_$.prototype.MultipleForEach = function(func) {
    if (typeof func === "function") {
        for (var listed = 0; listed <= this.elems.length * this.elems[0].length; listed += this.elems.length) {
            func($_$(this.elems).Merge().slice(listed, listed + this.elems.length));
        }
    }
    return this;
}
$_$.prototype.Merge = function() {
    if ($_$().Bool(this.elems)) {
        const merged = [];
        for (var nested = 0; nested < this.elems.length; nested++) {
            for (var nests = 0; nests < this.elems[nested].length; nests++) {
                for (var nestlist = 0; nestlist < this.elems.length; nestlist++) {
                    merged[merged.length] = this.elems[nestlist][nests];
                }
            }
        }
        return merged.slice(0, merged.length / this.elems.length);
    }
}
$_$.prototype.Bool = function(bools) {
    if (bools) {
        if (typeof bools === "object") {
            return Boolean(Object.keys(bools).length);
        }
        return true;
    }
    return false;
}
$_$.prototype.CSS = function(method, styles) {
    if (method && $_$().Bool(styles) && typeof method === "string" && typeof styles === "object") {
        if (method === "set" && !(Array.isArray(styles))) {
            $_$(this.elems).ForEach((elem) => {
                for (propval in styles) {
                    elem.style[propval] = styles[propval];
                }
            });
        }
        if (method === "get" && Array.isArray(styles)) {
            const vals = [];
            $_$(this.elems).ForEach((elem) => {
                vals[vals.length] = [];
                $_$(styles).ForEach((props) => {
                    vals[vals.length - 1][vals[vals.length - 1].length] = elem.style[props];
                });
            });
            return vals;
        }
        if (method === "add" && !(Array.isArray(styles))) {
            $_$(this.elems).ForEach((elem) => {
                for (propval in styles) {
                    elem.style[propval] += styles[propval];
                }
            });
        }
        if (method === "removefirst" && !(Array.isArray(styles))) {
            $_$(this.elems).ForEach((elem) => {
                for (propval in styles) {
                    elem.style[propval] = elem.style[propval].slice(0, elem.style[propval].indexOf(styles[propval])) + elem.style[propval].slice(elem.style[propval].indexOf(styles[propval]) + styles[propval].length, elem.style[propval].length);
                }
            });
        }
        if (method === "removelast" && !(Array.isArray(styles))) {
            $_$(this.elems).ForEach((elem) => {
                for (propval in styles) {
                    elem.style[propval] = elem.style[propval].slice(0, elem.style[propval].lastIndexOf(styles[propval])) + elem.style[propval].slice(elem.style[propval].lastIndexOf(styles[propval]) + styles[propval].length, elem.style[propval].length);
                }
            });
        }
        if (method === "removeall" && !(Array.isArray(styles))) {
            $_$(this.elems).ForEach((elem) => {
                for (propval in styles) {
                    elem.style[propval] = elem.style[propval].replace(new RegExp(styles[propval], "g"), "");
                }
            });
        }
        if (method === "contains" && !(Array.isArray(styles))) {
            var include = true;
            $_$(this.elems).ForEach((elem) => {
                for (propval in styles) {
                    if (!(elem.style[propval].includes(styles[propval]))) {
                        include = false;
                    }
                }
            });
            return include;
        }
    }
    return this;
}
$_$.prototype.Fade = function(opac = 1, speed = 400) {
    if (typeof speed === "number" && typeof opac === "number") {
        $_$(this.elems).CSS("set", { "opacity": opac });
        $_$(this.elems).CSS("add", { "transition": " opacity " + speed + "ms" });
    }
    return this;
}
$_$.prototype.HideShow = function(display = "") {
    if (typeof display === "string") {
        if ($_$(this.elems).CSS("contains", { "display": "none" })) {
            $_$(this.elems).CSS("set", { "display": display });
        } else {
            $_$(this.elems).CSS("set", { "display": "none" });
        }
    }
    return this;
}
$_$.prototype.InsertElement = function(place, els) {
    if (place && $_$().Bool($_$(els).elems) && typeof place === "string") {
        $_$(this.elems).ForEach((elem) => {
            $_$(els).ForEach((el) => {
                elem.insertAdjacentElement(place, el);
            });
        });
    }
    return this;
}
$_$.prototype.InsertHtml = function(place, htmls) {
    if (place && htmls && typeof place === "string" && typeof htmls === "string") {
        $_$(this.elems).ForEach((elem) => {
            elem.insertAdjacentHTML(place, htmls);
        });
    }
    return this;
}
$_$.prototype.Append = function(els) {
    if ($_$().Bool($_$(els).elems)) {
        $_$(this.elems).ForEach((elem) => {
            $_$(els).ForEach((el) => {
                elem.appendChild(el);
            });
        });
    }
    return this;
}
$_$.prototype.Childs = function() {
    const childs = [];
    $_$(this.elems).ForEach((elem) => {
        childs[childs.length] = [];
        $_$(elem.children).ForEach((child) => {
            childs[childs.length - 1][childs[childs.length - 1].length] = child;
        });
    });
    return childs;
}
$_$.prototype.Children = function() {
    const childs = [];
    $_$(this.elems).ForEach((elem) => {
        $_$(elem.children).ForEach((child) => {
            childs[childs.length] = child;
        });
    });
    return childs;
}
$_$.prototype.Clone = function(deeps = false) {
    const clones = [];
    $_$(this.elems).ForEach((elem) => {
        clones[clones.length] = elem.cloneNode(deeps);
    });
    return clones;
}
$_$.prototype.Contains = function(childs) {
    if ($_$().Bool(this.elems) && $_$().Bool($_$(childs).elems)) {
        var include = true;
        $_$(this.elems).ForEach((elem) => {
            $_$(childs).ForEach((child) => {
                if (!(elem.contains(child))) {
                    include = false;
                }
            });
        });
        return include;
    }
    return false;
}
$_$.prototype.Empty = function() {
    $_$(this.elems).ForEach((elem) => {
        while (elem.firstChild) {
            elem.removeChild(elem.firstChild);
        }
    });
    return this;
}
$_$.prototype.attr = function(method, attrvals) {
    if (method && $_$().Bool(attrvals) && typeof method === "string" && typeof attrvals === "object") {
        if (method === "set" && !(Array.isArray(attrvals))) {
            $_$(this.elems).ForEach((elem) => {
                for (attrval in attrvals) {
                    elem.setAttribute(attrval, attrvals[attrval]);
                }
            });
        }
        if (method === "get" && Array.isArray(attrvals)) {
            const vals = [];
            $_$(this.elems).ForEach((elem) => {
                vals[vals.length] = [];
                $_$(attrvals).ForEach((attrval) => {
                    if (elem.attributes[attrval]) {
                        vals[vals.length - 1][vals[vals.length - 1].length] = elem.attributes[attrval].value;
                    } else {
                        vals[vals.length - 1][vals[vals.length - 1].length] = "";
                    }
                });
            });
            return vals;
        }
        if (method === "add" && !(Array.isArray(attrvals))) {
            $_$(this.elems).ForEach((elem) => {
                for (attrval in attrvals) {
                    if (elem.attributes[attrval]) {
                        elem.attributes[attrval].value += attrvals[attrval];
                    } else {
                        elem.setAttribute(attrval, attrvals[attrval]);
                    }
                }
            });
        }
        if (method === "removefirst" && !(Array.isArray(attrvals))) {
            $_$(this.elems).ForEach((elem) => {
                for (attrval in attrvals) {
                    if (elem.attributes[attrval]) {
                        elem.attributes[attrval].value = elem.attributes[attrval].value.slice(0, elem.attributes[attrval].value.indexOf(attrvals[attrval])) + elem.attributes[attrval].value.slice(elem.attributes[attrval].value.indexOf(attrvals[attrval]) + attrvals[attrval].length, elem.attributes[attrval].value.length);
                    }
                }
            });
        }
        if (method === "removelast" && !(Array.isArray(attrvals))) {
            $_$(this.elems).ForEach((elem) => {
                for (attrval in attrvals) {
                    if (elem.attributes[attrval]) {
                        elem.attributes[attrval].value = elem.attributes[attrval].value.slice(0, elem.attributes[attrval].value.lastIndexOf(attrvals[attrval])) + elem.attributes[attrval].value.slice(elem.attributes[attrval].value.lastIndexOf(attrvals[attrval]) + attrvals[attrval].length, elem.attributes[attrval].value.length);
                    }
                }
            });
        }
        if (method === "removeall" && !(Array.isArray(attrvals))) {
            $_$(this.elems).ForEach((elem) => {
                for (attrval in attrvals) {
                    if (elem.attributes[attrval]) {
                        elem.attributes[attrval].value = elem.attributes[attrval].value.replace(new RegExp(attrvals[attrval], "g"), "");
                    }
                }
            });
        }
        if (method === "contains" && !(Array.isArray(attrvals))) {
            var include = true;
            $_$(this.elems).ForEach((elem) => {
                for (attrval in attrvals) {
                    if (elem.attributes[attrval]) {
                        if (!(elem.attributes[attrval].value.includes(attrvals[attrval]))) {
                            include = false;
                        }
                    } else {
                        include = false;
                    }
                }
            });
            return include;
        }
    }
    return this;
}
$_$.prototype.Html = function(method, inout = true) {
    if (typeof method === "string") {
        if (method === "inner") {
            if (typeof inout === "string") {
                $_$(this.elems).ForEach((elem) => {
                    elem.innerHTML = inout;
                });
            } else {
                const inners = [];
                $_$(this.elems).ForEach((elem) => {
                    inners[inners.length] = elem.innerHTML;
                });
                return inners;
            }
        }
        if (method === "outer") {
            if (typeof inout === "string") {
                $_$(this.elems).ForEach((elem) => {
                    elem.outerHTML = inout;
                });
            } else {
                const outers = [];
                $_$(this.elems).ForEach((elem) => {
                    outers[outers.length] = elem.outerHTML;
                });
                return outers;
            }
        }
    }
    return this;
}
$_$.prototype.Text = function(texts = true) {
    if (typeof texts === "string") {
        $_$(this.elems).ForEach((elem) => {
            elem.textContent = texts;
        });
    } else {
        const textlist = [];
        $_$(this.elems).ForEach((elem) => {
            textlist[textlist.length] = elem.textContent;
        });
        return textlist;
    }
    return this;
}
$_$.prototype.Class = function(method, classes = "") {
    if ($_$().Bool(this.elems) && method && typeof method === "string") {
        if (classes && typeof classes === "string") {
            if (method === "set") {
                $_$(this.elems).ForEach((elem) => {
                    $_$(classes.split(" ")).ForEach((listclass) => {
                        elem.className = listclass;
                    });
                });
            }
            if (method === "add") {
                $_$(this.elems).ForEach((elem) => {
                    $_$(classes.split(" ")).ForEach((listclass) => {
                        elem.classList.add(listclass);
                    });
                });
            }
            if (method === "remove") {
                $_$(this.elems).ForEach((elem) => {
                    $_$(classes.split(" ")).ForEach((listclass) => {
                        if (listclass) {
                            elem.classList.remove(listclass);
                        }
                    });
                });
            }
        } else if (method === "get") {
            const classeslist = [];
            $_$(this.elems).ForEach((elem) => {
                classeslist[classeslist.length] = elem.className;
            });
        }
        if (method === "contains") {
            var include = true;
            $_$(this.elems).ForEach((elem) => {
                $_$(classes.split(" ")).ForEach((listclass) => {
                    if (!(elem.classList.contains(listclass))) {
                        include = false;
                    }
                });
            });
            return include;
        }
    }
    if (method === "contains") {
        return false;
    }
    return this;
}