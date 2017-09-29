(function(){
	'use strict';
	angular.module('ly.watchwo')
		.controller('watchwo.main.controller',function(config,$scope,myModal,watchwo_api,create_entry_api,create_entry_data,watchwo_entry_data){
			var paramState = '';
			$scope.formData = {};
			$scope.skillTags = create_entry_data.skillTags['repair'];
			$scope.woType = create_entry_data.woType;
			$scope.states = watchwo_entry_data.states;
			$scope.afterSearch = false;
			$scope.$watch('formData',function(){//控制状态按钮是否可选
				$scope.afterSearch = false;
				$scope.currentPage = 1;
				$scope.list = null;
			},true);
			$scope.action = {
				getCities:function(){
				  	create_entry_api.queryCity(null,function(res){
				  		if(res.code == 0){
				  			$scope.cityList = res.data;
				  		}
				  	});
				},
				getCommunities:function(city){
					var param = {city:city};
					create_entry_api.querycommunity(param,function(res){
						if(res.code == 0){
							$scope.communities = res.data;
						}
					})
				},
				alterCity:function(city){
					$scope.formData.communityId = '';
					if(!city)return;
					this.getCommunities(city);
				},
				getList:function(page,param){
					param.states = paramState;
					page = page||0;
					param.limit = 10;
					param.offset = page*10;
					watchwo_api.queryList(param,function(res){
						if(res.code == 0){
							$scope.list = res.data;
							$scope.totalItems = res.count;
							$scope.afterSearch = true;
						}
					})
				},
				getFormData:function(){
					var form = $scope.formData;
					return {
						communityId : form.communityId,
						type : form.type,
						imgTag : form.cata&&form.cata.id,
						year : form.transDate&&form.transDate.slice(0,4),
						month : form.transDate&&form.transDate.slice(5)
					}
				},
				onChooseItem:function(type){
					$scope.woType.forEach(function(item){item.selected=false;})					
					type.selected = true;
					$scope.formData.type = type.id;
					if(type.id == 1){
						$scope.skillTags = create_entry_data.skillTags['repair'];
						$scope.states = watchwo_entry_data.states;
					}else{
						$scope.skillTags = create_entry_data.skillTags['praise'];
						$scope.states = watchwo_entry_data.states2;
					}
					this.setStateToDefault();
				},
				onChooseState:function(state){
					$scope.states.forEach(function(item){item.selected=false;})
					state.selected = true;
					$scope.currentPage = 1;

					paramState = state.id;
					var param = this.getFormData();
					this.getList(null,param);
				},
				onQuery:function(page){
					var param = this.getFormData();
					if($scope.watch_query_form.$invalid){
						$scope.oncheck = true;
					}else{
						this.getList(page,param);
					}
				},
				exportExcel:function(){
					var formData = this.getFormData();
					var queryString = $.map(formData,function(value,key){
						if(value){
							return key+'='+value;
						}
					}).join('&');
					window.open(config.backendUrl+'/customerservice/export?'+queryString+'&states='+paramState);
				},
				pageRefresh:function(page){
					var param = this.getFormData();
					this.getList(page,param);
				},
				checkDetail:function(id,state){
					watchwo_api.queryDetail(id,{type:$scope.formData.type},function(res){
						if(res.code == 0){
							myModal.show({
								size:'lg',
								title:$scope.formData.type==1?'报修详情':'投诉建议详情',
								retain:true,
								backdrop:true,
								templateUrl:'app/views/watchwo/watchwo.detail.html',
								data:res.data,
								role:{state:state,type:$scope.formData.type}//type是项目，state是列表里的状态栏
							})
						}
					})
				},
				viewInit:function(){
					this.getCities();
					this.setTypeToDefault();
					this.setStateToDefault();
					$scope.currentPage = 1;
				},
				setTypeToDefault:function(){
					$scope.woType.forEach(function(item){item.selected=false;})
					$scope.formData.type = $scope.woType[0].id;
					$scope.woType[0].selected = true;
				},
				setStateToDefault:function(){
					$scope.states.forEach(function(item){item.selected=false;})
					$scope.states[0].selected = true;
					paramState = $scope.states[0].id;
				},
				reset:function(){
					$scope.formData = {};
					this.setTypeToDefault();
					this.setStateToDefault();
					$scope.oncheck = false;
					$scope.afterSearch = false;
					$scope.currentPage = 1;
					$scope.list = $scope.totalItems = null;
				}
			}
			$scope.action.viewInit();
		})

})();