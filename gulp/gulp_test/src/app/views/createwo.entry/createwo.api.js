'use strict';
(function () {
	angular.module('ly.createwo.entry')
		.factory('create_entry_api',function(config,$http,myModal){
			return {
				//获取城市
				queryCity:function(param,callback){
					var url = '/customerservice/querycity';
					$http.get(config.backendUrl+url).then(function(res){
						if(res.status === 200){
							callback(res.data);
						}
					});
				},
				querycommunity:function(param,callback){
					var url = '/customerservice/querycommunity';
					$http.get(config.backendUrl+url,{
						params:param
					}).then(function(res){
						if(res.status == 200){
							callback(res.data);
						}
					})
				},
				addWo:function(param,callback){
					var url = '/customerservice/add';
					$http.post(config.backendUrl+url,param).then(function(res){
						if(res.status == 200){
							callback(res.data);
						}
					})
				},
			}
		})


		.constant('create_entry_data',{
			skillTags:{
				repair:[
					{id: 1,name: '开换锁'},
					{id: 2,name: '供电照明'},
					{id: 3,name: '抽水马桶'},
					{id: 4,name: '上下水管道'},
					{id: 5,name: '门窗维修'},
					{id: 6,name: '房屋主体'},
					{id: 7,name: '电梯/门禁'},
					{id: 8,name: '供暖设施'},
					{id: 9,name: '其它'}
				],
				praise:[
					{id: 1,name: '物业服务'},
					{id: 2,name: '环境保护'},
					{id: 3,name: '设备养护'},
					{id: 4,name: '治安秩序'},
					{id: 5,name: '街坊邻里'},
					{id: 6,name: '其它'},
				]
			},
			woType:[
				{id:1,name:'报修'},
				{id:2,name:'投诉'},
				{id:3,name:'表扬'},
			]
		})

		.filter('channel',function(){
			return function(raw){
				switch(raw){
					case '1':
						return '盛行天下';
					case '1002':
						return '米饭公社';
					default:
						return null;
				}
			}
		})
		.filter('category',function(){
			return function(raw){
				console.log(typeof raw)
				switch(raw){
					case 1:
						return '物业服务';
					case 2:
						return '环境保护';
					case 3:
						return '设备养护';
					case 4:
						return '治安秩序';
					case 5:
						return '街坊邻里';
					case 6:
						return '其它';
					default:
						return null;
				}
			}
		})
		.directive('formatToString',function(){
			return {
				require:'ngModel',
				link:function(scope,element,attrs,ngModel){
					// ngModel.$parsers.push(function(val){
					// 	return val+''
					// });
					ngModel.$formatters.push(function(val){
						return val+'';
					})
				}
			}
		})

})();
