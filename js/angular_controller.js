var Apollo = angular.module('Apollo', []);

Apollo.controller('apollo_config', function ($scope) {
    $scope.config = {'collection': {}};
    $scope.property_cnt = 1;
    $scope.collection_cnt = 1;
    $scope.add_property = function(css){
        var defaultName = '第'+ $scope.property_cnt + '个采集值',
            property = {'css': css, 're': '.*', 'name': defaultName};
        $scope.config.collection['property_'+ $scope.property_cnt] = property;
        $scope.property_cnt += 1;
    }

    // 控制两个面板的展示情况
    $scope.preViewStatus = false;
    $scope.configViewStatus = false;
    $scope.preViewToggle = function(){
        if(!$scope.preViewStatus){
            // 准备预览的数据
            $scope.previewData = JSON.stringify(config($scope.config).show_html(), null, 4);
        }
        $scope.configViewStatus = false;
        $scope.preViewStatus = true;
    }
    $scope.configViewToggle = function(){
        $scope.preViewStatus = false;
        $scope.configViewStatus = true;
    }
    $scope.backViewToggle = function(){
        $scope.preViewStatus = false;
        $scope.configViewStatus = false;
    }
});

// 预览面板的directive
Apollo.directive('apolloPreviewPanel', function(){
    return {
        restrict: 'A',
        templateUrl:  "/js/html_templates/" + 'preview.html',
        scope: {
            config: '=',
            showctl: '='
        },
}
});

// 编辑面板的directive
Apollo.directive('apolloEditPanel', function(){
    return {
        restrict: 'A',
        templateUrl:  "/js/html_templates/" + 'edit.html',
        scope: {
            config: '=',
            showctl: '='
        },
    }
});