'use strict';

(function() {

	var app = angular.module('swalk.head');

	app.directive('swalkHead', function() {
		return {
			restrict : 'E',
			scope : {},
			replace : true,
			controller : function controller($scope, $http, $cookies, $state, $rootScope, $interval) {
				$scope.logout = function(){
					sessionStorage.removeItem('authToken');
				}
			},
			templateUrl : 'app/modules/head/head.tpl.html',
			controllerAs : 'ctrl',
			bindToController : true
		};
	});

})();
