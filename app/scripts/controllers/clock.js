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

 	// var wrap = document.getElementById('clock');
 	// wrap.innerHTML += '<div id="clock-minutes"></div>';
 	// var element = document.getElementById('clock-minutes');

 	//element.innerHTML = '<header id="clock-seconds"></header>';
 	//var textElement = document.getElementById('clock-seconds');

 	// $scope.minutes =  new ProgressBar.Circle(element, {
 	// 	strokeWidth: 3,
 	// 	duration: 200,
 	// 	color: "rgba(255,255,255,.999)",
 	// 	trailColor: "rgba(255,255,255,.099)"
 	// });

 	var updateTime = function() {
   //  var now = new Date(),
   // 		second = now.getSeconds(),
   // 		minute = now.getMinutes(),
   // 		hour = now.getHours(),
   // 		hour = hour >= 12 ? hour-12 : hour;
 		// $scope.clock = moment(new Date()).format('HH:mm')
 		$scope.date = new Date();

	}


 	$interval(updateTime, 30000 * 1);
 	updateTime();
 })

 .controller('AnalogClockCtrl', function ($scope, $interval) {


   var interval = 1000;
   $scope.analog = {};
   var setDegrees = function (el, deg) {
    $scope.analog[el] = deg;
  };
  var setTime = function () {
    var time = moment();
    $scope.hours = time.hours();
    $scope.minutes = time.minutes() < 10 ? '0' + time.minutes() : time.minutes();
    $scope.seconds = time.seconds() < 10 ? '0' + time.seconds() : time.seconds();

    setDegrees('sec', 6 * time.seconds());
    setDegrees('min', 6 * time.minutes());
    setDegrees('hour', 30 * (time.hours() % 12) + time.minutes() / 2);
  };
  setTime();
  var promise = $interval(function () {
    setTime();
  }, interval);

  $scope.$on('$destroy', function () {
    $interval.cancel(promise);
  });

});
