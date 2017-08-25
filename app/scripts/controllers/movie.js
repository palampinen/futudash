'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:MovieCtrl
 * @description
 * # MovieCtrl
 * Get food data
 */
angular.module('futudashApp')
  .controller('MovieCtrl', function ($scope,$sce,Movies,Settings) {
  	$scope.title = Settings.get().finnkinoName;

		$scope.movies = 'Loading movies...'
		// MOVIES
		Movies.get(Settings.get().finnkinoArea)
		.then(function(data) {

		    var jsonData = x2js.xml_str2json(data);

		    // group by movie
		    $scope.movies = _.groupBy(jsonData.Schedule.Shows_asArray[0].Show_asArray,
          function(movie) {
            return movie.Title;
          });

		    $scope.movies = _.filter($scope.movies,
          function(movie){
            return $scope.filterStartedMovies(movie);
          });

		    // console.log($scope.movies);
		});


		// filter out already started showtimes
    var today = moment();
		$scope.filterStartedShows = function(show) {
		  return moment(show.dttmShowStart).isAfter(today);
		}

		// filter out already started movies
		$scope.filterStartedMovies = function(movie) {
		  return _.filter(movie, function(show) {
        return $scope.filterStartedShows(show);
      }).length;
		}

		// movie times
		$scope.getTime = function(time){
		  return moment(time).format('HH:mm');
		}
  });
