'use strict';

/*
 * futudashApp services
 */
 angular.module('futudashApp')


 // URL to API that enables cross-origin requests to anywhere
 .value('corsURL', '//cors-anywhere.herokuapp.com/')


/*
* Lunch menus from lounaat.info
*/
.factory('Food', ['$http','$q','Settings','corsURL', function($http, $q, Settings,corsURL) {
	return {
		get: function() {
			var day = new Date().getDay();
			if (!day) {
        day = 7; // sunday is 7 in lounaat.info
      }
			var url = corsURL+'http://lounaat.info/ajax/filter?view=lahistolla&page=0';

			var deferred = $q.defer();
			$http.get(url,{
				params:{
					day: day,
					'coords[address]': Settings.address,
					'coords[lat]': Settings.get().coords.lat,
					'coords[lng]': Settings.get().coords.lng
				}
			})
			.success(function(data) {
				deferred.resolve(data)
			})
			.error(function(data){
				deferred.reject(data);
			});
			return deferred.promise;

		}
	}
}])




/*
*	Finnkino API for movies
* http://www.finnkino.fi/xml/
*/
.factory('Movies', ['$http','$q','Settings', function($http, $q) {
	return {
		get: function(areaid) {
			var deferred = $q.defer();
			$http.get('//www.finnkino.fi/xml/Schedule',{
				params:{
					area:areaid,
					dt:moment(new Date()).format('DD.MM.YYYY'),
				}
			}).success( function(data){
				deferred.resolve(data)
			})
			return deferred.promise;
		}
	}
}])





/*
* Load any RSS feed
*	https://developers.google.com/feed/v1/jsondevguide#loadBasic
*/
.factory('FeedService',['$http',function($http){
	return {
		parseFeed : function(url,num){
			return $http.jsonp('//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num='+num+'&callback=JSON_CALLBACK&q=' + encodeURIComponent(url));
		}
	}
}])






/*
* Weather data
*	http://openweathermap.org/current
* api.openweathermap.org/data/2.5/weather?lat=35&lon=139 | api.openweathermap.org/data/2.5/weather?q=Tampere,Finland
*/
.factory('Weather',['$http','$q','corsURL','Settings', function($http, $q,corsURL,Settings) {

	return {
		get: function() {
			var deferred = $q.defer();

			$http.get(corsURL+'http://api.openweathermap.org/data/2.5/weather',{
				params:{
            APPID: '488e49ee1ce983be59e69292af6c9dd4',
						units: 'metric',
						lat:Settings.get().coords.lat,
						lon:Settings.get().coords.lng
				}
			})
			.success(function(data, status , header, config){
				deferred.resolve(data)
			});
			return deferred.promise;
		}
	}

}])





/*
* Flow data
* Gets Futurice Flow message activity
*	http://base.vv.si/api/flow
*		uses Flowdock messages API https://www.flowdock.com/api/messages
*
*		Parameters:
*			limit = [num]				// max 100 per flow, flowdock maximum
*			flow 	= [flowname]
*
* 	Result
*			Object with following structure
*				[dd.mm.yyyy hh] = [msgcount]
*/

.factory('Flow',['$http','$q','corsURL', function($http, $q,corsURL) {

	return {
		get: function(flow,limit) {
			var deferred = $q.defer();

			$http.get(corsURL+'base.vv.si/api/flow/',{
					params:{
						flow:flow,
						limit:limit,
					}
			})
			.success(function(data, status , header, config){
				deferred.resolve(data)
			});
			return deferred.promise;
		}
	}

}])


/*
*	Get JSON
*/
.factory('CustomJSON',['$http','$q','corsURL', function($http, $q,corsURL) {

	return {
		get: function(url,params) {
			var deferred = $q.defer();

			$http.get(corsURL+url,{
					params:params
			})
			.success(function(data, status , header, config){
				deferred.resolve(data)
			});
			return deferred.promise;
		}
	}

}])
