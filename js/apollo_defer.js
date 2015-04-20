(function(){

    scripts = document.getElementsByTagName('script')[0];
    var js_fils = [
        '/js/lib/angular.js',
        '/js/lib/jquery-2.1.0.min.js',
        '/js/page_util.js',
        '/js/tpl.js',
        '/js/config.js',
        '/js/angular_controller.js',
        '/js/bootstrap.js',
    ];

    js_fils.map(function(url){load(url)});
    
    function load(url) {
        script = document.createElement('script');
        script.defer = true;
        script.src = url;
        scripts.parentNode.insertBefore(script, scripts);
    }

})();
