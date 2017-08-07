'use strict';

/*
 * futudashApp settings
 * Settings could be saved in some DB and/or configured via some UI
 */
 angular.module('futudashApp')

 .factory('Settings', function() {

 	return {
 		get: function() {
 			var settings =  _.defaults(
      (JSON.parse(localStorage.getItem('futudash')) || {}),
      {
  	 		name:'Tampere',
  			logourl: 'http://static.flockler.com/assets/futurice/images/futurice-logo--white.svg',
        staticImgUrl: 'https://images.unsplash.com/photo-1464306076886-da185f6a9d05?dpr=1&auto=format&fit=crop&w=1199&h=799&q=80&cs=tinysrgb&crop=',
  	 		coords:{
  	 			lat: 61.5023026,
  	 			lng: 23.763800500000002
  	 		},
  	 		address: 'kuninkaankatu-21-tampere',
  	 		finnkinoArea:1035,
  	 		finnkinoName: 'Plevna',
  	 		rss: 'http://futurice.com/blog/rss',
  	 		color:{
  	 			main: '#ffffff',
  	 			dark: '#6BBEB6',
  	 			light: '#BBEAE5'
  	 		},
  	 		flows: [
  			    {
  			        name:  'tampere',				        // flow url key
  			        label: 'Tampere',				        // not used atm
  			        fill:  'rgba(255,255,255,0.3)'	// Bg Color of graph
  			    },
  			    {
  			        name:  'tampere-offtopic-friday',
  			        label: 'Tampere Offtopic',
  			        fill:  'rgba(0,0,0,0.15)'
  			    }
  			]
			})

      console.log(settings);

      return settings;
 		},
 		set: function(data){
 			// save settings
 			localStorage.setItem('futudash', JSON.stringify(data))
 		}
 }

 });
