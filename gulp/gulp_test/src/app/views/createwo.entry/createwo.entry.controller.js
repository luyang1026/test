'use strict';
(function () {
	angular.module('ly.createwo.entry')
		.controller('ly.createwo.entry.controller',function($scope,create_entry_api,create_entry_data,myModal){
			$scope.formData = {};
			$scope.skillTags = create_entry_data.skillTags['repair'];
			$scope.woType = create_entry_data.woType;
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
					$scope.formData.communityName = '';
					if(!city)return;
					this.getCommunities(city);
				},
				addWo:function(param){
					create_entry_api.addWo(param,function(res){
						if(res.code == 0){
							myModal.show({text:res.message});
						}else{
							myModal.show({text:res.message});
						}
					})
				},
				getFormData:function(){
					var form = $scope.formData;
					if(form.type!=1){//投诉表扬
						form.houseInfo = null;
						form.anonymous = form.anonymous?'1':'0';
					}else{//报修
						form. anonymous = null;
					}
					return {
						city : form.city,
						community : form.community&&form.community.name,
						communityId : form.community&&form.community.id,
						anonymous : form.anonymous,
						name : form.name,
						phone : form.phone,
						houseInfo : form.houseInfo,
						device : form.cata&&form.cata.name,
						type : form.type,
						description : form.description,
						imgTag : form.cata&&form.cata.id
					}
				},
				onChooseItem:function(type){
					if(!type){
						$scope.formData.type = $scope.woType[0].id;
					}else{					
						$scope.woType.forEach(function(item){item.selected=false;})
						type.selected = true;
						$scope.formData.type = type.id;
						if(type.id == 1){
							$scope.skillTags = create_entry_data.skillTags['repair'];
						}else{
							$scope.skillTags = create_entry_data.skillTags['praise'];
						}
					}
				},
				onSubmit:function(){
					var param = this.getFormData();
					if($scope.createwo_entry_form.$invalid){
						$scope.oncheck = true;
					}else{
						this.addWo(param);
					}
				},
				viewInit:function(){
					this.getCities();
					this.onChooseItem();//set first button to default value
				},
				reset:function(){
					$scope.formData = {};
					this.onChooseItem();
					$scope.oncheck = false;
				}
			}
			$scope.action.viewInit();
		})

})();