var page_id = page_var.page_id;
var page_path = page_var.page_path;


loadCss(page_path, page_id);

function loadCss(page_path, page_id) {
    var link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = '/css/' + page_path + page_id + '.css';
    document.getElementsByTagName("head")[0].appendChild(link);
}


require.config({
    baseUrl: '/js/',

    paths: {
        'angular': 'lib/angular',
        'angular-route': 'lib/angular-route.min',
        'domReady': 'lib/domReady',
        'require': 'lib/jquery-2.1.0.min',
    },

    shim: {
        'angular': {
            exports: 'angular'
        },
        'angular-route': {
            deps: ['angular']
        }
    },

    deps: [
        page_path + page_id,
    ]
});
