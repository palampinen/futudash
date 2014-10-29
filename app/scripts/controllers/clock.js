'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:ClockCtrl
 * @description
 * # ClockCtrl
 * Clock with progressbar.js, not used atm
 */
 angular.module('futudashApp')
 .controller('ClockCtrl', function ($scope) {

 	var wrap = document.getElementById('clock');
 	wrap.innerHTML = '<div id="clock-hours"></div>';
 	wrap.innerHTML += '<div id="clock-minutes"></div>';

 	var element = document.getElementById('clock-minutes'),
 	hourel  = document.getElementById('clock-hours');

 	element.innerHTML = '<header id="clock-seconds"></header>';
 	var textElement = document.getElementById('clock-seconds');

 	var hours = new ProgressBar.Circle(hourel, {
 		strokeWidth: 1,
 		duration: 200,
 		color: "#000",
 		trailColor: "rgba(255,255,255,.05)"
 	}),minutes =  new ProgressBar.Circle(element, {
 		strokeWidth: 2,
 		duration: 200,
 		color: "#42B049",
 		trailColor: "transparent"
 	});


 	$interval(function() {
 		var now = new Date(),
 		second = now.getSeconds(),
 		minute = now.getMinutes(),
 		hour  = now.getHours(),
 		hour = hour >= 12 ? hour-12 : hour;


 		hours.animate((hour+minute/60) / 12, function() {});
 		minutes.animate(minute / 60, function() {
	            //textElement.innerHTML = second;
	          });

 		$scope.clock = getCurrentTime();
 		$scope.date = now;

 	}, 10000);
 	var getCurrentTime = function(){
 		var now = new Date(),
 		hours = now.getHours(),
 		minutes = now.getMinutes();

 		if(hours < 10) hours = '0'+hours;
 		if(minutes < 10) minutes = '0'+minutes;
 		return hours + ':' + minutes;
 	}




 });
