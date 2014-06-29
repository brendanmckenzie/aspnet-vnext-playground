angular.module('App.Shared')
.controller('NavigationCtrl', ['$scope', '$rootScope', '$urlRouter', function ($scope, $rootScope, $urlRouter) {
	$scope.current = 'home';
	$rootScope.$on('$stateChangeStart', function (event, next) {
		$scope.current = next.name;
	});
}])