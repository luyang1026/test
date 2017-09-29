'use strict';
(function(){
	angular.module('ly.login')
		.factory('loginApi',function($http,config,myModal){
			return{
				login:function(param,callback){
					$http.post(config.backendUrl+'/customersv/login',{
							username:param.username,
							password:param.password	
					}).then(function(res){
						callback(res.data);
					},function(res){
						myModal.show({text:res.data&&res.data.msg})
					})
				}
			}
		})
})();