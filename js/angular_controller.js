var Apollo = angular.module('Apollo', []);

Apollo.factory('tempCss', function() {
    var css = '';
    return {
        get: function() {
            return css;
        },
        set: function(val) {
            css = val;
        }
    }
});

Apollo.factory('property_cnt', function() {
    var count = 1;
    return {
        get: function() {
            return count;
        },
        set: function(val) {
            count = val;
        },
        addOne: function() {
            count += 1;
        },
        add: function(val) {
            count += val;
        }
    }
});

Apollo.controller('apollo_config', function ($scope, tempCss, property_cnt) {
    $scope.config = {'collection': {}};
    $scope.test = 1;

    $scope.add_property = function() {
        var defaultName = '第{0}个采集值'.format(property_cnt.get()),
            property = {'css': tempCss.get(), 're': '.*', 'name': defaultName, 'pid': 'property_'+ property_cnt.get()};
        $scope.config.collection['property_'+ property_cnt.get()] = property;
        property_cnt.addOne();

        console.log($scope.test);
    }
    $scope.delete_property = function(pid) {
        delete $scope.config.collection[pid];
        property_cnt.add(-1);
    }

    $scope.add_potential_target = function(css) {
        tempCss.set(css);
        $scope.test += 1;
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


simple_directive = function(templateUrl){
    return function(){
        return {
            restrict: 'A',
            templateUrl:  templateUrl,
            scope: {
                config: '=',
                showctl: '='
            },
        }
    }
}


Apollo.directive('apolloPreviewPanel', simple_directive('/js/html_templates/preview.html'));
Apollo.directive('apolloEditPanel', simple_directive('/js/html_templates/edit.html'));
