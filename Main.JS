const $_$ = function(sel) {
    if (!(this instanceof $_$)) {
        return new $_$(sel);
    }
    if (sel) {
        if (typeof sel === "string") {
            this.elems = Object.values(document.querySelectorAll(sel));
            return this;
        } else if (typeof sel === "object" && Object.values(sel).length && !(Array.isArray(sel))) {
            this.elems = Object.values(sel);
            return this;
        }
        this.elems = sel;
        return this;
    }
    this.elems = [];
    return this;
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
    if ($_$().Bool(this.elems) && method && $_$().Bool(styles) && typeof method === "string" && typeof styles === "object") {
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
        if (method === "addbegin" && !(Array.isArray(styles))) {
            $_$(this.elems).ForEach((elem) => {
                for (propval in styles) {
                    elem.style[propval] = styles[propval] + elem.style[propval];
                }
            });
        }
        if (method === "addend" && !(Array.isArray(styles))) {
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
        $_$(this.elems).CSS("addend", { "transition": " opacity " + speed + "ms" });
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
$_$.prototype.AddClass = function(classes) {
    if (classes && typeof classes === "string") {
        $_$(this.elems).ForEach((elem) => {
            $_$(classes.split(" ")).ForEach((listclass) => {
                elem.classList.add(listclass);
            });
        });
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
$_$.prototype.InsertHTML = function(place, htmls) {
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
        var istrue = true;
        $_$(this.elems).ForEach((elem) => {
            $_$(childs).ForEach((child) => {
                if (!(elem.contains(child))) {
                    isfalse = false;
                }
            });
        });
        return istrue;
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
        if (method === "set" && !(Array.isArray(attrvals))) {}
        if (method === "get" && Array.isArray(attrvals)) {}
        if (method === "addbegin" && !(Array.isArray(attrvals))) {}
        if (method === "addend" && !(Array.isArray(attrvals))) {}
        if (method === "removefirst" && !(Array.isArray(attrvals))) {}
        if (method === "removelast" && !(Array.isArray(attrvals))) {}
        if (method === "removeall" && !(Array.isArray(attrvals))) {}
        if (method === "contains" && !(Array.isArray(attrvals))) {}
    }
    return this;
}