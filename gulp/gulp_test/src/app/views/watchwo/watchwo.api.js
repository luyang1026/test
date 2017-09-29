(function () {
	'use strict';
	angular.module('ly.watchwo')
		.factory('watchwo_api',function(config,$http,myModal){
			return {
				//工单列表
				queryList:function(param,callback){
					var url = '/customerservice/query';
					$http.get(config.backendUrl+url,{
						params:param
					}).then(function(res){
						if(res.status == 200){
							callback(res.data);
						}
					})
				},
				//详情
				queryDetail:function(id,param,callback){
					var url = '/customerservice/query/'+id;
					$http.get(config.backendUrl+url,{
						params:param
					}).then(function(res){
						if(res.status == 200){
							callback(res.data);
						}
					})
				},
			}
		})
		.constant('watchwo_entry_data',{
			states:[
				{id:'5',name:'全部'},
				{id:'0',name:'待指派'},
				{id:'1',name:'处理中'},
				{id:'2,3',name:'已维修'},
				{id:'4',name:'已关闭'},
			],
			states2:[
				{id:'5',name:'全部'},
				{id:'0',name:'待回复'},
				{id:'1',name:'已回复'},
				{id:'2',name:'已解决'}
			]
		})
})();
