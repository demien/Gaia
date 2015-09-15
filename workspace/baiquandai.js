var casper = require('casper').create();

var page = casper.cli.options.page
var target_url = 'http://www.baiquandai.com/financePerPage.do?shoveDate' + new Date().getTime();
var css_config = {
                    "product_list": {
                        "property1": {
                            "css": ".invest-case-4",
                            "re": ".*",
                            "name": "product",
                        },
                    },
                }
var css_config_str = JSON.stringify(css_config)

var G = window;
G.products = []
casper.start();

casper.open(target_url, {
    method: 'post',
    data:   {
        'curPage': page,
        'productid': 0
    },
    headers: {
        'Referer': 'http://www.baiquandai.com/finance.do',
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
                // var regExpRes = new RegExp(re).exec(element.innerText);
                // element_data['innerText'] = regExpRes[0];
                element_data['innerText'] = element.innerText;
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



casper.then(function(){
    var product_list = scrape_with_css(casper, css_config_str);
    casper.each(product_list['product_list'], function(self, product){
        casper.thenOpen(product.product.href);
        casper.then(function(){
            config = {
                "product_detail": {
                    "property1": {
                        "css": ".invest-detail-title",
                        "re": ".*",
                        "name": "title",
                    },
                    "property2": {
                        "css": "HTML > BODY > DIV[class='container-white w1002'] > div[class='row'] > div[class='col-md-8'] > div[id='invest-detail-introduction'] > div[class='introduction-container fl'] > div[class='introduction-main clearfix'] > dl[class='first'] > dd[class='red light']",
                        "re": ".*",
                        "name": "interest",
                    },
                    "property3": {
                        "css": "html > body > div[class='container-white w1002'] > div[class='row'] > div[class='col-md-8'] > div[id='invest-detail-introduction'] > div[class='introduction-container fl'] > div[class='introduction-main clearfix'] > dl:nth-child(2) > dd",
                        "re": ".*",
                        "name": "duration",
                    },
                    "property4": {
                        "css": "html > body > div[class='container-white w1002'] > div[class='row'] > div[class='col-md-8'] > div[id='invest-detail-introduction'] > div[class='introduction-container fl'] > div[class='introduction-main clearfix'] > dl:nth-child(3) > dd",
                        "re": ".*",
                        "name": "total_amount",
                    },
                    "property5": {
                        "css": "html > body > div[class='container-white w1002'] > div[class='row'] > div[class='col-md-8'] > div[id='invest-detail-introduction'] > div[class='introduction-container fl'] > div:nth-child(3) > p:nth-child(2)",
                        "re": ".*",
                        "name": "pay_type",
                    },
                    "property6": {
                        "css": "html > body > div[class='container-white w1002'] > div[class='row'] > div[class='col-md-4'] > div:nth-child(1) > p > span",
                        "re": ".*",
                        "name": "available_amount",
                    },
                    "property7": {
                        "css": "html > body > div[class='container-white w1002'] > div[class='row'] > div[class='col-md-8'] > div[class='tab-content'] > div[id='project-info'] > div[class='description-container']",
                        "re": ".*",
                        "name": "description",
                    },
                },
            }
            var re = scrape_with_css(casper, JSON.stringify(config));
            for (var attrname in re)
                { product[attrname] = re[attrname]; }
            G.products.push(product)
        })
    })
})

casper.run(function(){
    console.log(JSON.stringify({collection: G.products}));
    this.exit();
});
