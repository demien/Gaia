var page_util = {
    xpath: function(elm){
        var allNodes = document.getElementsByTagName('*');
        for (var segs = []; elm && elm.nodeType == 1; elm = elm.parentNode)
        {
            if (elm.hasAttribute('id')) {
                    var uniqueIdCount = 0;
                    for (var n=0;n < allNodes.length;n++) {
                        if (allNodes[n].hasAttribute('id') && allNodes[n].id == elm.id) uniqueIdCount++;
                        if (uniqueIdCount > 1) break;
                    };
                    if ( uniqueIdCount == 1) {
                        segs.unshift('id("' + elm.getAttribute('id') + '")');
                        return segs.join('/');
                    } else {
                        segs.unshift(elm.localName.toLowerCase() + '[@id="' + elm.getAttribute('id') + '"]');
                    }
            } else if (elm.hasAttribute('class')) {
                segs.unshift(elm.localName.toLowerCase() + '[@class="' + elm.getAttribute('class') + '"]');
            } else {
                for (i = 1, sib = elm.previousSibling; sib; sib = sib.previousSibling) {
                    if (sib.localName == elm.localName)  i++; };
                    segs.unshift(elm.localName.toLowerCase() + '[' + i + ']');
            };
        };
        return segs.length ? '/' + segs.join('/') : null;
    },

    csspath_without_id: function(el){
        var names = [];
        while (el.parentNode){
            if (el==el.ownerDocument.documentElement)
                names.unshift(el.tagName);
            else{
                for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
                names.unshift(el.tagName+":nth-child("+c+")");
            }
            el=el.parentNode;
        }
        return names.join(" > ");
    },

    csspath_with_id: function(el){
        var names = [];
        while (el.parentNode){
            if (el.id){
                names.unshift('#'+el.id);
                break;
            }else{
                if (el==el.ownerDocument.documentElement) names.unshift(el.tagName);
                else{
                    for (var c=1,e=el;e.previousElementSibling;e=e.previousElementSibling,c++);
                    names.unshift(el.tagName+":nth-child("+c+")");
                }
                el=el.parentNode;
            }
        }
        return names.join(" > ");
    },

    csspath_standard: function(el){
        var names = [];
        while (el.parentNode){
            if (el==el.ownerDocument.documentElement)
                names.unshift(el.tagName);
            else{
                if (el.id){
                    names.unshift(el.tagName+"[id='"+el.id+"']")
                }else if(el.classList.length > 0){
                    names.unshift(el.tagName+"[class='"+el.className+"']")
                }else if(!is_full_brother(el) && (el.previousElementSibling || el.nextElementSibling)){
                    for (var c=1, e=el; e.previousElementSibling; e=e.previousElementSibling, c++);
                    names.unshift(el.tagName+":nth-child("+c+")");
                }else{
                    names.unshift(el.tagName);
                }
            }
            el=el.parentNode;
        }
        return names.join(" > ");
    },
}

var is_full_brother = function(el){
    var elementSiblings = [];
    var target_previous = el;
    var target_next = el;
    while(target_previous.previousElementSibling){
        target_previous = target_previous.previousElementSibling;
        elementSiblings.unshift(target_previous);
    }
    while(target_next.nextElementSibling){
        target_next = target_next.nextElementSibling;
        elementSiblings.unshift(target_next);
    }
    if(elementSiblings.length === 0){return false;}
    if(elementSiblings.length===1){
        origin_element = el;
        compare_element = elementSiblings[0];
    }else{
        origin_element = elementSiblings[0];
        compare_element = elementSiblings[1];
    }
    origin_class_list = origin_element.classList.length > 1 ? origin_element.classList.sort() : origin_element.classList;
    compare_class_list = compare_element.classList.length > 1 ? compare_element.classList.sort() : compare_element.classList;
    return origin_class_list.toString() === compare_class_list.toString() ? true : false;
}
