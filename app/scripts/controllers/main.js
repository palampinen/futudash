'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the futudashApp
 */
 angular.module('futudashApp')
 .controller('MainCtrl', function ($scope, $interval, $http, Weather, Settings) {

  // Set body bg
  var bgcolor = Settings.get().color.main || '#555';

  // document.body.style.backgroundColor = bgcolor;
  // document.getElementById('bg').style.backgroundColor = bgcolor;
  document.body.className += ' fixed';
  $scope.bgcolor = bgcolor;

  // Huge Cell Content Logic
  var showMainContent = function(){
    var now = new Date();
    var isEvening = now.getHours() > 14;
    var isWeekend = now.getDay() == 0 || now.getDay() == 6;

    $scope.mainContent = (isEvening || isWeekend) ?  'movie' : 'food';
  }

  // check 10 min interval if changed
  $interval(showMainContent, 1000 * 60 * 10);
  showMainContent();

});
