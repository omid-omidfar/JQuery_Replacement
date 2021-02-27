const _ = {
    getElms: (elms) => {
        if (elms) {
            if (typeof elms != "object") {
                return document.querySelectorAll(elms);
            }
            return elms;
        }
    },
    Class_List: (classes) => {
        if (classes) {
            return classes.split(" ");
        }
    },
    Add_Class: (elements, classes) => {
        if (elements && classes) {
            const select_elms = _.getElms(elements);
            const class_lists = _.Class_List(classes);
            for (var elem = 0; elem < select_elms.length; elem++) {
                for (var classes_list = 0; classes_list < class_lists.length; classes_list++) {
                    select_elms[elem].classList.add(class_lists[classes_list]);
                }
            }
        }
    },
    Remove_Class: (elements, classes) => {
        if (elements && classes) {
            const select_elms = _.getElms(elements);
            const class_lists = _.Class_List(classes);
            for (var elem = 0; elem < select_elms.length; elem++) {
                for (var classes_list = 0; classes_list < class_lists.length; classes_list++) {
                    select_elms[elem].classList.remove(class_lists[classes_list]);
                }
            }
        }
    },
    Toggle_Class: (elements, classes) => {
        if (elements && classes) {
            const select_elms = _.getElms(elements);
            const class_lists = _.Class_List(classes);
            for (var elem = 0; elem < select_elms.length; elem++) {
                for (var classes_list = 0; classes_list < class_lists.length; classes_list++) {
                    select_elms[elem].classList.toggle(class_lists[classes_list]);
                }
            }
        }
    },
    Empty_Class: (elements) => {
        if (elements) {
            const len = _.getElms(elements).length;
            for (var elem = 0; elem < len; elem++) {
                _.getElms(elements)[0].classList = "";
            }
        }
    },
    Has_Class: (elements, classes) => {
        if (elements && classes) {
            const select_elms = _.getElms(elements);
            const class_lists = _.Class_List(classes);
            for (var elem = 0; elem < select_elms.length; elem++) {
                for (var classes_list = 0; classes_list < class_lists.length; classes_list++) {
                    if (select_elms[elem].classList.contains(class_lists[classes_list])) {
                        return true;
                    }
                    return false;
                }
            }
        }
        return false;
    },
    All_Has_Class: (elements, classes) => {
        if (elements && classes) {
            const select_elms = _.getElms(elements);
            const class_lists = _.Class_List(classes);
            var true_false = 0;
            for (var elem = 0; elem < select_elms.length; elem++) {
                for (var classes_list = 0; classes_list < class_lists.length; classes_list++) {
                    if (select_elms[elem].classList.contains(class_lists[classes_list])) {
                        true_false++;
                    } else {
                        true_false--;
                    }
                }
            }
            if (true_false && true_false == select_elms.length * class_lists.length) {
                return true;
            }
        }
        return false;
    },
    Text_Add: (elements, text) => {
        if (elements && text) {
            const select_elms = _.getElms(elements);
            for (var elem = 0; elem < select_elms.length; elem++) {
                select_elms[elem].textContent += text;
            }
        }
    },
    Text_Set: (elements, text) => {
        if (elements && text) {
            const select_elms = _.getElms(elements);
            for (var elem = 0; elem < select_elms.length; elem++) {
                select_elms[elem].textContent = text;
            }
        }
    },
    Text_Get: (elements) => {
        if (elements) {
            const select_elms = _.getElms(elements);
            var texts = [];
            for (var elem = 0; elem < select_elms.length; elem++) {
                texts[texts.length] = select_elms[elem].textContent;
            }
            return texts;
        }
    }
}