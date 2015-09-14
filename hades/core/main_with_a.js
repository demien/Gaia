var casper = require('casper').create();
var utils = require("utils");

var target_url = casper.cli.options.url
var css_config_str = casper.cli.options.css_config

var G = window;
G.list = []
casper.start();



casper.open(target_url, {
    method: 'post',
    data:   {
        'curPage': 1,
        'productid': 0
    },
    headers: {
        'Accept': '*/*',
        'Accept-Language':'en-US,en;q=0.8',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36',
        'Referer': 'http://www.baiquandai.com/finance.do',
        'Host': 'www.baiquandai.com',
        'Connection': 'keep-alive',
        'Content-Length': '21',
    }
});


var scrape_with_css = function(engine, css_config_str){
    return engine.evaluate(function(css_config_str) {
        var css_config = JSON.parse(css_config_str);

        var scrape_css = function(self, css, re, name){
            var elements = self.__utils__.findAll(css);
            var elements = [].slice.call(elements);
            var temp = elements.map(function(element){
                var element_data = {}
                var regExpRes = new RegExp(re).exec(element.innerText);
                element_data['innerText'] = regExpRes[0];
                element_data['href'] = element.href;
                return {'name': name, 'element_data': element_data};
            });
            return temp;
        }

        var format_collection = function(collection){
            var length_array = [],
                result = [];
                property_id_list = [];
            for(property_id in collection){
                property_id_list.push(property_id);
                length_array.push(collection[property_id].length);
            };

            var max_length = Math.max.apply(Math, length_array);
            for(var i = 0; i<max_length; i++){
                var item = {};
                for(property_id_index in property_id_list){
                    var property_id = property_id_list[property_id_index];
                    var tempItem = collection[property_id][i];
                    if(tempItem){
                        item[tempItem['name']] = tempItem['element_data']; //单元素数组
                    }
                }
                result.push(item);
            };
            return result;
        };

        var show_html = function(self, css_config){
            var dom = {}
            for(collection_id in css_config){
                var collection = css_config[collection_id];
                var property_list = {};
                for(property_id in collection){
                    property = collection[property_id];
                    property_list[property_id] = scrape_css(self, property['css'], property['re'], property['name']);
                }
                dom[collection_id] = format_collection(property_list);
            }
            return dom;
        }
        return show_html(this, css_config);
        
    }, css_config_str);
}

var get_product_detail = function(product){
    casper.open(product.unit.href);
    console.log(product.unit.href);
    casper.then(function(){
        config = {
            "collection": {
                "property_1": {
                    "css": ".invest-detail-title",
                    "re": ".*",
                    "name": "title",
                }
            },
        }
        var re = scrape_with_css(casper, JSON.stringify(config));
        G.list.push(re)
        // console.log(JSON.stringify(re));
        // 
        // return 
    })
}

casper.then(function(){
    var product_list = scrape_with_css(casper, css_config_str);
    var result = product_list['collection'].map(function(product){
        console.log('open')
        casper.open(product.unit.href);
        casper.then(function(){
            config = {
                "collection": {
                    "property_1": {
                        "css": ".invest-detail-title",
                        "re": ".*",
                        "name": "title",
                    }
                },
            }
            console.log('scrape')
            var re = scrape_with_css(casper, JSON.stringify(config));
            G.list.push(re)
        })
    })
})


casper.run(function(){
    console.log(JSON.stringify(G.list));
    this.exit();
});
