var config = function(configCss){

    var config_css = configCss;

    scrape_css = function(css, re, name){
        var elements = $.find(css);
        var temp = elements.map(function(element){
            var regExpRes = new RegExp(re).exec(element.innerText);
            regExpRes['name'] = name;
            return regExpRes;
        });
        return temp;
    }

    format_collection = function(collection){
        var length_array = [],
            result = [];
        var property_name_list = [];

        for(property_name in collection){
            property_name_list.push(property_name);
            length_array.push(collection[property_name].length);
        };
        var max_length = Math.max.apply(Math, length_array);
        for(var i = 0; i<max_length; i++){
            var item = {};
            for(property_name_index in property_name_list){
                var property_name = property_name_list[property_name_index];
                var tempItem = collection[property_name][i];
                item[tempItem['name']] = tempItem[0]; // 单元素数组
            }
            result.push(item);
        };
        return result;
    };

    show_html = function(){
        var dom = {}
        for(collection_name in config_css){
            var collection = config_css[collection_name];
            var collection_result = {};
            for(property_name in collection){
                property = collection[property_name];
                collection_result[property_name] = scrape_css(property['css'], property['re'], property['name']);
            }
            dom[collection_name] = format_collection(collection_result);
        }
        return dom;
    };

    show_config = function(){
        return config_css;
    }

    return {show_html: show_html, show_config: show_config}
}
