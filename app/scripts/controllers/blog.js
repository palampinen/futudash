'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:BlogCtrl
 * @description
 * # BlogCtrl
 * Get RSS data
 */
angular.module('futudashApp')
  .controller('BlogCtrl', function ($scope,$interval,Settings,FeedService) {

  	var limit = 1,		// posts
  			interval = 1; // rotate interval (min)

		$scope.loadFeed=function(feedSrc){
		   FeedService.parseFeed(feedSrc,limit).then(function(res){
			    $scope.feeds=res.data.responseData.feed.entries;
			    console.log($scope.feeds);
			    $scope.feeds.map( function(a){
			       a.publishedDate = a.publishedDate
              ? moment(a.publishedDate).format('DD.MM.YYYY')
              : moment().format('DD.MM.YYYY')
			     return a;
          });

			    $scope.showFeed = 0;
			    $scope.feed = $scope.feeds[$scope.showFeed];

			        //loop posts
			    $interval(function() {
			        $scope.showFeed = $scope.showFeed >= $scope.feeds.length-1 ? 0 : $scope.showFeed+1;
			        $scope.feed = $scope.feeds[$scope.showFeed]
			     }, 1000*60*interval);
		    });
		}


		$scope.loadFeed(Settings.get().rss);

  });
