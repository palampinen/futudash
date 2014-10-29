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
    
		$scope.food = 'Loading food...'

		Food.get(7)
		.then(function(data) {
			var el = document.createElement( 'div' );
			el.innerHTML = data;
			var sections = el.getElementsByTagName( 'section' );
			
			// filter ones without menu (have class 'missing')
			sections =_.filter(sections,function(section){
				return section.innerHTML.indexOf('missing') < 0
			})

			// convert to string
			var html = _.map( sections, function(node){
	        return node.outerHTML || "";
	    }).join("");

		  $scope.food  = $sce.trustAsHtml(html);

		}, function(data) {
		  console.log('No food data for you')
		});


  });
