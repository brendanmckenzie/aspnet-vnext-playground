angular.module('App.Modules').controller('ChatCtrl', ['$scope', '$rootScope', 'Hub', function ($scope, $rootScope, Hub) {
    $scope.messages = [];
    $scope.name = localStorage['name'];
    
    $scope.hub = new Hub('chat', {
        'send': function (message) {
            $scope.messages.push(message);
            $scope.$$phase || $scope.$apply();
        }
    },
    ['send'], $scope);


    $scope.hub.start().then(function() { 
        $scope.ready = true;
        $scope.$$phase || $scope.$apply();
    });

    $scope.send = function () {
        $scope.hub.send($scope.name, $scope.message);

        $scope.message = '';
    }

    $scope.storeName = function () {
        localStorage['name'] = $scope.name;
    };
}]);