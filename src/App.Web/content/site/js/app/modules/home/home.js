angular.module('App.Modules').controller('HomeCtrl', ['$scope', 'PageService', function ($scope, PageService) {
	PageService.setTitle(null);
}]);