var casper = require('casper').create();
var utils = require("utils");

// var target_url = 'http://www.dianping.com/search/category/2/45/g152';
var target_url = casper.cli.options.url
var css_config_str = casper.cli.options.css_config

casper.start(target_url);

casper.thenEvaluate(function(css_config_str) {
    var css_config = JSON.parse(css_config_str);
    
    var scrape_css = function(self, css, re, name){
        var elements = self.__utils__.findAll(css);
        var temp = elements.map(function(element){
            var regExpRes = new RegExp(re).exec(element.innerText);
            regExpRes['name'] = name;
            return regExpRes;
        });
        return temp;
    }

    var format_collection = function(collection){
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
                if(tempItem){
                    item[tempItem['name']] = tempItem[0]; //单元素数组
                }
            }
            result.push(item);
        };
        return result;
    };

    var show_html = function(self, css_config){
        var dom = {}
        for(collection_name in css_config){
            var collection = css_config[collection_name];
            var collection_result = {};
            for(property_name in collection){
                property = collection[property_name];
                collection_result[property_name] = scrape_css(self, property['css'], property['re'], property['name']);
            }
            dom[collection_name] = format_collection(collection_result);
            
        }
        return dom;
    }
    scrape_data = show_html(this, css_config);
    self.__utils__.echo(JSON.stringify(scrape_data));

}, css_config_str);

casper.run(function(){
    this.exit();
});
