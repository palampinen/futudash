'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:FoodCtrl
 * @description
 * # FoodCtrl
 * Get food data
 */
 var RESTAURANT_LIMIT = 9;
 var APPROVED_RESTAURANTS = [
   '/ravintola-tampella',
   '/sodexo-tampereen-oikeustalo',
   '/trattoria',
   '/valssi',
   '/speakeasy-finlayson-ylkerta', //-ylkerta and -alakertoa
   '/fabric',
   '/juvenes-frenckell',
   '/the-grill',
   '/ohranjyva',
 ];

angular.module('futudashApp')
  .controller('FoodCtrl', function ($scope,$sce,Food, $interval) {

    $scope.foodLoading = true;
    var loadFoodInterval = 60 * 60 * 1000;

    var loadFood = function() {
  		Food.get()
  		.then(function(data) {

        var el = document.createElement( 'div' );
        el.innerHTML = data;
        var sections = el.getElementsByClassName( 'menu' );


        var foodData = [].slice.call( sections ); // HTMLCollection to Array

        // # Filter approved restaurants
        foodData = _.filter(foodData, function(place) {
          return _.findIndex(APPROVED_RESTAURANTS, function(restaurant) {
            return place.innerHTML.indexOf(restaurant) >= 0;
          }) >= 0;
        });

        // max limit
        foodData = foodData.slice(0, RESTAURANT_LIMIT);


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
  	        return node.outerHTML || '';
  	    }).join('');

  		  $scope.foodData  = $sce.trustAsHtml(html);
        $scope.foodLoading = false;

  		}, function(err) {
  		  console.log('No food data for you', err);
        $scope.foodLoading = false;
  		});
    };

    $interval(loadFood, loadFoodInterval);
    loadFood();


  });
