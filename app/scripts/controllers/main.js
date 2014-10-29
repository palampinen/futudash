'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the futudashApp
 */
 angular.module('futudashApp')
 .controller('MainCtrl', function ($scope,$interval,$http,Weather, Settings) {


// Set body bg
var bgcolor = Settings.get().color.main || '#555';
document.getElementsByTagName("body")[0].style = "overflow:hidden; background-color:"+bgcolor;


// Huge Cell Content Logic
var hugeLogic = function(){
    $scope.hugeContent = ( new Date().getHours() > 14 || new Date().getDay() == 0 || new Date().getDay() == 6) ?  'movie' : 'food';
    console.log('now showing ',$scope.hugeContent)
}

// check 10 min interval if changing
$interval(hugeLogic,1000*60*10);
hugeLogic();








});
