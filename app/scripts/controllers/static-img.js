'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:StaticImgCtrl
 * @description
 * # StaticImgCtrl
 * Know where you're at
 */
angular.module('futudashApp')
  .controller('StaticImgCtrl', function ($scope, Settings) {

    $scope.imgUrl = Settings.get().staticImgUrl;

  });
