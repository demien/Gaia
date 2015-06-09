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
        '/js/apollo/page_util.js',
        '/js/apollo/tpl.js',
        '/js/apollo/config.js',
        '/js/apollo/angular_controller.js',
        '/js/apollo/bootstrap.js',
    ];

    loadScript(js_fils);

})();
