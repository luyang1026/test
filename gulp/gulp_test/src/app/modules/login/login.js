'use strict';

(function () {
    angular.module('ly.login', [])
        .controller('forum.login.controller',function($scope,$state,loginApi,myModal){
            $scope.name = '';
            $scope.password = '';
            $scope.login=function(){
                loginApi.login({
                    username:$scope.name,
                    password:$scope.password
                },function(res){
                    sessionStorage.setItem('authToken',res.token);
                    $state.go('forum.main');
                })
                	// $state.go('forum.main');return;
             //    if($scope.name!='admin'||$scope.password!='123'){
             //        myModal.show({
             //            text:'用户名或密码错误'
             //        });
             //    }else{
             //       $state.go('forum.main');
            	// }
            }
        })
})();