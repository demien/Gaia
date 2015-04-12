var Apollo = angular.module('Apollo', []);

Apollo.controller('apollo-config', function ($scope) {
    $scope.config = {'collection': {}};
    $scope.property_cnt = 1;
    $scope.collection_cnt = 1;
    
    $scope.add_property = function(css){
        property = {'css': css, 're': '.*'};
        $scope.config.collection['property'+ $scope.property_cnt] = property;
        $scope.property_cnt += 1;
    }
});
