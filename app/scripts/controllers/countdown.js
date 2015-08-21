'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Know where you're at
 */
angular.module('futudashApp')
  .controller('CountdownCtrl', function ($scope,$interval,Settings) {

  //var settings = Settings.get();
  var now = new Date();

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
