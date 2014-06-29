angular.module('App.Modules').controller('ChatCtrl', ['$scope', '$rootScope', 'Hub', 'PageService', function ($scope, $rootScope, Hub, PageService) {
    PageService.setTitle('Chat');
    $scope.messages = [];
    $scope.clients = [];
    
    $scope.hub = new Hub('chat', {
        'send': function (message) {
            $scope.messages.push(message);
            $scope.$$phase || $scope.$apply();
        },
        'client_connected': function (client) {
            var exists = false;
            for (var i = 0; i < $scope.clients.length; i++) {
                if ($scope.clients[i].ConnectionId == client.ConnectionId) {
                    exists = true;
                    break;
                }
            }

            if (!exists) {
                $scope.clients.push(client);
            }
            
            $scope.$$phase || $scope.$apply();
        },
        'client_disconnected': function (id) {
            for (var i = 0; i < $scope.clients.length; i++) {
                if ($scope.clients[i].ConnectionId == id) {
                    $scope.clients.splice(i, 1);
                    break;
                }
            }
            $scope.$$phase || $scope.$apply();
        },
        'set_name': function (id, name) {
            for (var i = 0; i < $scope.clients.length; i++) {
                if ($scope.clients[i].ConnectionId == id) {
                    $scope.clients[i].Name = name;
                    break;
                }
            }
            $scope.$$phase || $scope.$apply();
        }
    },
    ['Send', 'SetName', 'List'], $scope);


    $scope.hub.start().then(function() {
        $scope.hub.List().then(function (data) {
            $scope.clients = data;
            $scope.$$phase || $scope.$apply();
        });

        if (localStorage['name']) {
            $scope.name = localStorage['name'];
            $scope.hub.SetName($scope.name);
        }
        else {
            $scope.name = 'Guest';
        }

        $scope.ready = true;
        $scope.$$phase || $scope.$apply();
    });

    $scope.send = function () {
        $scope.hub.Send($scope.name, $scope.message);

        $scope.message = '';
    }

    $scope.storeName = function () {
        localStorage['name'] = $scope.name;

        $scope.hub.SetName($scope.name);
    };
}]);