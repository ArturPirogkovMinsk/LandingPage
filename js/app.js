var lpApp = angular.module('lpApp', []);

lpApp.controller('lpPriceCtrl', function ($scope, $http) {

    $scope.sortBy = 'name';
    $scope.sortRev = false;

    $http.get('price.json').then(function (res) {
        $scope.prices = res.data;
        $scope.calc();
    }).catch(function (err) {
        $scope.reqStatus = err.status;
        $scope.reqStatusText = err.statusText;
    });

    $scope.sortSet = function (propertyName) {
        if ($scope.sortBy == propertyName) {
            $scope.sortRev = !$scope.sortRev;
        }
        $scope.sortBy = propertyName;
    }
    
    $scope.calc = function() {
        $scope.prices.forEach(function(price) {
            price.price2 = price.price * (1 - price.discount);
        });
    }
});