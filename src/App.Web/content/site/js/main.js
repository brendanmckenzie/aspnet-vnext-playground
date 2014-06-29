angular.module('App', [
	'ui.router',
    'SignalR',
    'angularMoment',
    'App.Shared',
    'App.Modules'])

.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url: '/',
		templateUrl: '/content/site/js/app/modules/home/home.html',
		controller: 'HomeCtrl'
	}).state('chat', {
		url: '/chat',
		templateUrl: '/content/site/js/app/modules/chat/chat.html',
		controller: 'ChatCtrl'
	})
}]);