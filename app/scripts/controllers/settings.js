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

    // Set body bg
    var bgcolor = Settings.get().color.main || '#555';
    document.getElementsByTagName("body")[0].style = "overflow:scroll; background-color:"+bgcolor;

    $scope.settings = Settings.get();

    $scope.save = function(){
    	Settings.set($scope.settings)
    	$scope.settings = Settings.get();
    }

    $scope.restore = function(){
        Settings.set(null)
        $scope.settings = Settings.get();
    }

    $scope.isObjectOrArray = function(val){
    		return _.isObject(val)  || _.isArray(val)
    }

  });
