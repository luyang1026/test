'use strict';
var myApp = angular.module('app', ['ui.router','ly.commonDirective','LocalStorageModule','angularFileUpload', 'ui.bootstrap', 'ngAnimate', 'ngCookies', 'ly.confirm',
    'ly.login','ly.main','ly.createwo.entry','ly.watchwo'])
    .constant('config',{
        //local
        backendUrl:'http://172.16.1.253:8081/backend'
        //test
        // backendUrl:'http://192.168.105.12:8081/backend'
        //integreted
        // backendUrl:'http://int-miback.4zlink.com:8081/backend'
    })
    .config(function($urlRouterProvider,$stateProvider,$httpProvider){
        $urlRouterProvider.otherwise('/forum/login');
        $httpProvider.interceptors.push('AuthInterceptor');
        $httpProvider.defaults.transformRequest.push(function(input){
            return input
        })
    	$stateProvider
    		.state('forum',{
    			url:'/forum',
    			abstract:true,
    			template:'<div ui-view class="view-main"></div>'
    		})
                .state('forum.login',{
                    url:'/login',
                    templateUrl:'app/modules/login/login.tpl.html',
                    controller:'forum.login.controller'
                })
        		.state('forum.main', {
        			url: '/main',
        			templateUrl: "app/modules/main/user.tpl.html"
        		})
                    //创建工单
                    .state('forum.main.createwo',{
                        url:'/createwo',
                        abstract:true
                    })
                        .state('forum.main.createwo.entry',{
                            url:'/entry',
                            views:{
                                'mainContent@forum.main':{
                                    templateUrl:'app/views/createwo.entry/createwo.entry.html',
                                    controller:'ly.createwo.entry.controller'
                                }
                            }
                        })
                    //监控工单
                    .state('forum.main.watchwo',{
                        url:'/watchwo',
                        abstract:true
                    })
                		.state('forum.main.watchwo.main',{
                			url:'/main',
                			views:{
                				'mainContent@forum.main':{
                					templateUrl:'app/views/watchwo/watchwo.main.html',
                                    controller:'watchwo.main.controller'
                				}
                			}
                		})
    })
    .factory('$console',function(){
        return{
            log:function(val){
                console.log(val)
            },
            typeof:function(val){
                console.log(typeof val)
            }
        }
    })
    .factory('AuthInterceptor',function($q,$injector){
        return{
           request:function(config){
                var token = sessionStorage.getItem('authToken');
                config.headers.Authorization = token;
                return config;
           },
           responseError:function(rejection){
                var timer = null;
                if(rejection.status == 401){
                    $injector.get('myModal').close();
                    $injector.get('myModal').show({text:'登录状态已失效'});
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        $injector.get('$state').go('forum.login');
                    },1000);
                }else{
                    var err = rejection.status+':'+rejection.statusText;
                    console.log(rejection.status+':'+rejection.statusText+'<br>'+rejection.config.url);
                    $injector.get('myModal').show({text:err});
                }
                return $q.reject(rejection);
           }
        }
    })
    
;(function ($) {
    $.fn.datetimepicker.dates['zh-CN'] = {
        days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
        daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
        daysMin: ["日", "一", "二", "三", "四", "五", "六"],
        months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
        today: "今日",
        clear: "清除",
        meridiem: ['am', 'pm'],
        suffix: ['st', 'nd', 'rd', 'th'],
        format: "yyyy-mm-dd",
        titleFormat: "yyyy年mm月",
        weekStart: 1
    };
}(jQuery));