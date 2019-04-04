var lpApp = angular.module('lpApp', []);

lpApp.controller('lpTeamCtrl', function ($scope, $http) {
    
    $http.get('team.json').then(function (res) {
        $scope.members = res.data;        
    }).catch(function (err) {
        $scope.reqStatus = err.status;
        $scope.reqStatusText = err.statusText;
    });  
});


lpApp.controller('lpPriceCtrl', function ($scope, $http) {
    
    $http.get('price.json').then(function (res) {
        $scope.prices = res.data;
        $scope.calc();
        $scope.sortGet();
    }).catch(function (err) {
        $scope.reqStatus = err.status;
        $scope.reqStatusText = err.statusText;
    });

    $scope.sortSet = function (propertyName) {
        if ($scope.sortBy == propertyName) {
            $scope.sortRev = !$scope.sortRev;
        }
        $scope.sortBy = propertyName;
        localStorage.sortBy = $scope.sortBy;
        localStorage.sortRev = $scope.sortRev;
    }

    $scope.sortGet = function () {
        if (localStorage.sortBy && localStorage.sortRev) {
            $scope.sortBy = localStorage.sortBy;
            $scope.sortRev = localStorage.sortRev == 'true';
        } else {
            $scope.sortBy = 'name';
            $scope.sortRev = false;
        }
    }

    $scope.calc = function() {
        $scope.prices.forEach(function(price) {
            price.price2 = price.price * (1 - price.discount);
        });
    }
});


