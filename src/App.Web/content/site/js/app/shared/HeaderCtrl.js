angular.module('App.Shared')
.controller('HeaderCtrl', ['$scope', '$rootScope', 'PageService', function ($scope, $rootScope, PageService) {
	$scope.Page = PageService;
}])