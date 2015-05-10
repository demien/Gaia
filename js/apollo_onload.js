(function(){

    function loadScript(urls){
        if(urls.length == 0) {return;}
        var script = document.createElement("script")
        var url = urls.shift()
        script.type = "text/javascript";
        script.src = url;
        script.addEventListener('load', function(){
            loadScript(urls);
        });
        document.body.appendChild(script);
    };

    var js_fils = [
        '/js/lib/angular.js',
        '/js/lib/jquery-2.1.0.min.js',
        '/js/page_util.js',
        '/js/tpl.js',
        '/js/config.js',
        '/js/angular_controller.js',
        '/js/bootstrap.js',
        '/js/lib/ui-bootstrap-tpls-0.13.0.js'
    ];

    loadScript(js_fils);

})();
