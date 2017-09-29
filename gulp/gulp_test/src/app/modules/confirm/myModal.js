'use strict';
(function(){
	angular.module('ly.confirm')
		.factory('myModal',['$uibModal',function($uibModal){
			var modalInstances = [];
			var type;
			var builder = {
				open:function(config){
					var templateUrl = config.templateUrl||'app/modules/confirm/myConfirm.html';
					var modalInstance = $uibModal.open({
						templateUrl:templateUrl,
						controller:function($scope,$uibModalInstance,config){
							$scope.title = config.title||'';
							$scope.text = config.text||'';
							$scope.data = config.data||{};
							$scope.role = config.role||{};
							switch(type){
								case 'show':
									$scope.footer = false;
									break;
								case 'confirm':
									$scope.footer = true;
									break;
							}
						},
						backdrop:config.backdrop||false,
						size:config.size||'',
						resolve:{
							config:config
						}
					});
					modalInstances.push(modalInstance);
					return modalInstance.result;
				},
				close:function(){
					if(modalInstances.length){
						modalInstances.shift().dismiss();
					}
				},
				show:function(config){
					type = 'show';
					config.size = config.size||'sm';
					this.open(config);//{size:提示框大小,title:标题,text:内容}
					if(!config.retain){
						setTimeout(builder.close,1000);
					}
				},
				confirm:function(config){
					type = 'confirm';
					return this.open(config);
				}
			}
			return builder;

			
		}])
		.factory('myLoading',function($q){
			var deferred = $q.defer();
			var promise = deferred.promise;

			var loadingArea = $('.loading-layer');
			var canvas = document.getElementById('loading');
			var ctx = canvas.getContext('2d');
			var num = 12;
			canvas.width = 300;
			canvas.height = 300;

			ctx.translate(canvas.width/2,canvas.height/2);
			ctx.strokeStyle = "#d41f14";
			ctx.lineCap = 'round'
			ctx.globalAlpha = "0.1";
			ctx.lineWidth = "3";
			function loading(){
				ctx.rotate(Math.PI*2/num);
				ctx.beginPath();
				for (var i = 0; i < num; i++) {
					ctx.rotate(Math.PI*2/num);
					ctx.moveTo(12, 0);
					ctx.lineTo(25, 0);
					ctx.stroke();
				}
			}
			return {
				show:function(){
					loadingArea.show();
					var n = 0;
					canvas.timer = setInterval(function(){
						ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
						loading(n%num);
						n++;
					},80);
				},
				hide:function(){
					loadingArea.hide();
					clearInterval(canvas.timer);
					deferred.resolve();
					return promise;
				}
			}
		})
})();
	