'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:ClockCtrl
 * @description
 * # ClockCtrl
 * Clock with progressbar.js
 */
 angular.module('futudashApp')
 .controller('ClockCtrl', function ($scope,$interval) {



 	var wrap = document.getElementById('clock');
 	wrap.innerHTML += '<div id="clock-minutes"></div>';
 	var element = document.getElementById('clock-minutes');

 	//element.innerHTML = '<header id="clock-seconds"></header>';
 	//var textElement = document.getElementById('clock-seconds');

 	$scope.minutes =  new ProgressBar.Circle(element, {
 		strokeWidth: 3,
 		duration: 200,
 		color: "rgba(255,255,255,.999)",
 		trailColor: "rgba(255,255,255,.099)"
 	});

 	var updateTime = function(){
	   	var now = new Date(),
 		second = now.getSeconds(),
 		minute = now.getMinutes(),
 		hour  = now.getHours(),
 		hour = hour >= 12 ? hour-12 : hour;

 		$scope.minutes.animate(minute / 60, function() {
	        //textElement.innerHTML = second;
	   	});

 		$scope.clock = moment(new Date()).format('HH:mm')
 		$scope.date = now;

	}


 	$interval(updateTime, 1000 * 1);
 	updateTime();



 });
