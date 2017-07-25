var app = angular.module("myApp", ["ngTagsInput"]);
app.controller("myCtrl", ["$scope", "$timeout", function($scope, $timeout) {
    $scope.hello = "Hello this is angular speaking!";

    $timeout(function() {
        $("select").select2();
    });
}]);
