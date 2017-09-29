(function () {
	'use strict';
	angular.module('ly.commonDirective')
		.directive('myDatePicker', function($filter){
	        return {
	            restrict: 'A',
	            require: 'ngModel',
	            link: function (scope, element, attrs, ngModelCtrl) {
	            	var role = attrs.myDatePickerRole;
	                var minView = element.data("minView");
	                var startView = element.data("startView");
	                element.on('click',function(){
						switch(role){
			                case 'start':
		                		var end = scope.formModal.endDate;
			                	if(end){
			                		var d = new Date(end);
			                		d.setDate(d.getDate()-90);
			                		$(this).datetimepicker('setStartDate', d);
			                		$(this).datetimepicker('setEndDate', end);
			                	}
			                	break;
		                	case 'end':
		                		var start = scope.formModal.startDate;
			                	if(start){
			                		var d = new Date(start);
			                		d.setDate(d.getDate()+90);
			                		$(this).datetimepicker('setStartDate', start);
			                		$(this).datetimepicker('setEndDate', d);
			                	}
			                	break;
		                }	                	
	                });
	                element.datetimepicker({
	                    autoclose: true,
	                    weekStart:0,
	                    minView: minView||2,
	                    startView: startView||2,
	                    format:'yyyy-mm',
	                    language: 'zh-CN',
	                    startDate: '2013-01-01',      // set a minimum date
	                    endDate: '2099-10-10'          // set a maximum date
	                }).on('changeDate', function (e) {
	                    if(e.date != null){
	                    	var date = $filter('date')(e.date,'yyyy-MM');
	                        ngModelCtrl.$setViewValue(date);
	                        scope.$apply();
	                    }
	                });
	            }
	        };
    	})

})();
