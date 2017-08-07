'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:SettingsCtrl
 * @description
 * # SettingsCtrl
 * Controller of the futudashApp
 */
angular.module('futudashApp')
  .controller('SettingsCtrl', function ($scope,$timeout,$location,Settings) {

    // Set body bg
    var loadSettings = function(){
        var bgcolor = Settings.get().color.main || '#555';
        document.body.style.backgroundColor = bgcolor;
        document.body.className = document.body.className.replace('fixed','');
    }
    loadSettings();

    $scope.settings = Settings.get();

    $scope.$watch('settings',
        function(a){ console.log(a)}
        );

    $scope.save = function(){
    	Settings.set($scope.settings);
    	$scope.settings = Settings.get();
        $timeout(function(){
            $location.path('#/')
        },300)
    }

    $scope.restore = function(){
        Settings.set(null)
        $scope.settings = Settings.get();
    }

    $scope.isObjectOrArray = function(val){
    		return _.isObject(val)  || _.isArray(val)
    }

  });
