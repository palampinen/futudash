'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:MapCtrl
 * @description
 * # MapCtrl
 * Know where you're at
 */
angular.module('futudashApp')
  .controller('MapCtrl', function ($scope,$interval,Settings) {
    
	$scope.initialize = function() {
	    var styles = [{"featureType":"landscape","elementType":"all","stylers":[{"color":Settings.get().color.main}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":Settings.get().color.light}]},{"featureType":"road","elementType":"all","stylers":[{"visibility":"on"},{"color":Settings.get().color.dark}]},{"featureType":"poi.park","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.school","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"off"}]}];
	    var mapOptions = {
	      center: { lat: Settings.get().coords.lat, lng: Settings.get().coords.lng},
	      zoom: 14,
	      disableDefaultUI: true

	  };
	  var map = new google.maps.Map(document.getElementById('map-canvas'),
	    mapOptions);

	  map.setOptions({styles: styles});
	}

	$scope.initialize();
	//google.maps.event.addDomListener(window, 'load', initialize);





  });
