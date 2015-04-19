(function(){

    function loadScript(urls, index){
        if(!index ) {
          index = 0;
        }
        if(index == urls.length){
            return;
        }

        var script = document.createElement("script")
        script.type = "text/javascript";
        script.src = urls[index];
        index++;
        script.addEventListener('load', function(){
            loadScript(urls, index);
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
    ];

    loadScript(js_fils);

})();
