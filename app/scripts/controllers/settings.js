'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the futudashApp
 */
angular.module('futudashApp')
  .controller('SettingsCtrl', function ($scope,Settings) {
    $scope.settings = Settings.get();

    $scope.save = function(){
    	Settings.set($scope.settings)
    	$scope.settings = Settings.get();
    }

    $scope.isObjectOrArray = function(val){
    		return _.isObject(val)  || _.isArray(val)
    }

  });
