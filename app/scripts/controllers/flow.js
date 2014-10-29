'use strict';

/**
 * @ngdoc function
 * @name futudashApp.controller:FlowCtrl
 * @description
 * # MapCtrl
 * How is it flowing?
 *
 * TODO: append data instead of replacing it
 */
angular.module('futudashApp')
  .controller('FlowCtrl', function ($scope,$interval,Flow,Settings) {

  	$scope.title = Settings.get().name;

		var HOURS = 7,		// last hours
  			INTERVAL = 1; // update interval (min)

		// last x hours in array
		var getLastHours = function(x){
		    var hours    = [],
		    now      = new Date(),
		    nowH     = new Date(now.setHours(now.getHours() + 1)).getHours(),
		    i;
		    for (i=0; i<x; i++){
		        if(nowH<0) nowH = 23;
		        hours.push(nowH--); 
		    }

		    return hours.reverse();;
		}

		// hour keys for json data
		var getHourKeys = function(x){
		    var keys    = [],
		    now      = new Date(),
		    nowH     = moment(now).add(1,'h'),
		    i;
		    
		    for (i=0; i<x; i++){

		        keys.push( moment(nowH).subtract( i, 'h').format('DD.MM.YYYY HH')  ); 
		    }
		    return keys.reverse();
		}


		var options = {

		    ///Boolean - Whether grid lines are shown across the chart
		    scaleShowGridLines : false,
		    scaleFontFamily: 'proxima-nova',
		    scaleFontSize: 20,
		    scaleFontStyle: '900',
		    scaleFontColor: "rgba(0,0,0,.25)",
		    scaleOverride: true,
		    scaleSteps: 6,
		    scaleStepWidth: 5,
		    scaleStartValue: 0,
		    showScale: true,
		    scaleGridLineColor : "rgba(0,0,0,.0)",  
		    scaleGridLineWidth : 0,
		    scaleIntegersOnly: true,
		    bezierCurve : true,
		    bezierCurveTension : 0.4,
		    pointDot : true,
		    pointDotRadius : 4,
		    pointDotStrokeWidth : 1,
		    pointHitDetectionRadius : 20,
		    datasetStroke : true,
		    datasetStrokeWidth : 2,
		    datasetFill : true,
		    showTooltips: false,
		    responsive: true,
		};



		$scope.flows = Settings.get().flows;



		var flow_datasets = _.map($scope.flows, function(flow,x) {

		    return {
		        label: flow.label,
		        fillColor: flow.fill,
		        strokeColor: "transparent",
		        pointColor: "transparent",
		        pointStrokeColor: "transparent",
		        pointHighlightFill: "transparent",
		        pointHighlightStroke: "transparent",
		        data: new Array(HOURS+1).join('0').split('').map(parseFloat)
		    }
		 });


		$scope.ctx = document.getElementById("flowChart").getContext("2d");
		$scope.flowChartdata = {
		    labels: getLastHours(HOURS),
		    datasets: flow_datasets
		};
		$scope.flowLineChart = new Chart($scope.ctx).Line($scope.flowChartdata, options);    




		$scope.getFlows = function(disableAnimation){
		    _.each($scope.flows,function(flow,key){
		        Flow.get(flow.name,100).then(function(data){  
		            $scope.tredata = [];
		            var keys = getHourKeys(HOURS);
		            for(var i = 0; i<keys.length;i++){
		                (data[keys[i]]!=undefined) ? $scope.tredata.push( data[keys[i] ] ) : $scope.tredata.push(0);
		            }

		            $scope.flowChartdata.labels = getLastHours(HOURS);
		            $scope.flowChartdata.datasets[key].data = $scope.tredata;
		            if(disableAnimation) options.animation = false;
		            $scope.flowLineChart = new Chart($scope.ctx).Line($scope.flowChartdata, options);    

		        })
		    })
		}

		$scope.getFlows(false);

		$interval(function() {
		        $scope.getFlows(true)
		},1000*60*INTERVAL);



  });
