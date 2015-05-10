var Apollo = angular.module('Apollo', []);

Apollo.controller('apollo_config', function ($scope) {
    $scope.config = {'collection': {}};
    $scope.property_cnt = 1;
    $scope.collection_cnt = 1;

    // $scope.tplRootUrl =;

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
      $scope.configViewStatus = false;
      $scope.preViewStatus = !$scope.preViewStatus;
      console.log($scope.preViewStatus);
    }
    $scope.configViewToggle = function(){
      $scope.preViewStatus = false;
      $scope.configViewStatus = !$scope.configViewStatus;
      console.log($scope.configViewStatus);
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