'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:FoodCtrl
 * @description
 * # FoodCtrl
 * Get food data
 */
angular.module('futudashApp')
  .controller('FoodCtrl', function ($scope,$sce,Food) {

    $scope.foodLoading = true;

		Food.get()
		.then(function(data) {

      var limit = 9;

      var el = document.createElement( 'div' );
      el.innerHTML = data;
      var sections = el.getElementsByClassName( 'menu' );

      var foodData = [].slice.call( sections ); // HTMLCollection to Array
      foodData = foodData.slice(0, limit);


			// var el = document.createElement( 'div' );
			// el.innerHTML = data;
			// var sections = el.getElementsByClassName( 'menu' );

      //    var sections;
			// // // filter ones without menu (have class 'missing')
			// sections = _.filter(sections,function(section){
			// 	return section.innerHTML.indexOf('missing') < 0
			// })


			// convert to string
			var html = _.map(foodData, function(node){
	        return node.outerHTML || "";
	    }).join("");

		  $scope.foodData  = $sce.trustAsHtml(html);
      $scope.foodLoading = false;

		}, function(data) {
		  console.log('No food data for you');
      $scope.foodLoading = false;
		});


  });
