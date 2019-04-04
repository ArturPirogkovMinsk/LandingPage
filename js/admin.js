var lpApp = angular.module('lpAdminApp', []);

lpApp.controller('lpAdminCtrl', function ($scope, $http) {
    
    $scope.membersOrder = 'name';
    $scope.reverse = false;

    $http.get('team.json').then(function (res) {
        $scope.members = res.data;        
    }).catch(function (err) {
        $scope.reqStatus = err.status;
        $scope.reqStatusText = err.statusText;
    });  

    $scope.addItem = function(newName, newTitle, newExperience){
        $scope.members.push({
            name: newName,
            title: newTitle,
            experience: newExperience
        });
    }

    $scope.deleteItem = function(item){
        console.log($scope.members.indexOf(item));
      $scope.members.splice($scope.members.indexOf(item), 1);
    }

    $scope.setOrder = function (order) {
        if($scope.membersOrder == order) {
            $scope.reverse = !$scope.reverse;
        } else {
            $scope.reverse = false;
        }
        $scope.membersOrder = order;
    }
});
