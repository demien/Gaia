define(['require', 'angular', 'controller'], function(require, ng){

    require(['domReady!'], function (document) {
        ng.bootstrap(document, ['phonecatApp']);
    });

});
