var ip_server = '127.0.0.1:8585';

//includes web server modules
var server = require('webserver').create();

//start web server
var service = server.listen(ip_server, function(request, response) {
    var url = getParameterByName('url', request.url);

    var casper = require('casper').create({
        // clientScripts: ["includes/jquery.min.js"],
    });

    casper.start(url, function() {
    });

    casper.then(function() {
    });

    casper.run(function() {
        var html = this.getHTML();
        html += '<link rel="stylesheet" href="http://localhost/css/apollo.css" type="text/css" >';
        html += '<link rel="stylesheet" href="http://localhost/css/bootstrap.min.css" type="text/css" >';
        html += '<script type="text/javascript" src="http://localhost/js/apollo_onload.js"></script>';
        response.setEncoding('UTF-8');
        response.statusCode = 200;
        response.write(html);
        response.close();
    });

});
console.log('Server running at http://' + ip_server+'/');

function getParameterByName(name, url) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(url);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
