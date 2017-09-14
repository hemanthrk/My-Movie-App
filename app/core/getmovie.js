
'use strict'
angular.module('myApp.temp',['ngResource']).
factory('GETMOVIE',['$resource', function($resource){

	return $resource('https://api.themoviedb.org/3/search/multi?api_key=2d7ae88493c45364c094cab420adf070&language=en-US&query=:movieName',{},{

		query:{

			method: 'GET',
			params: {movieName: 'shawshank'}
		}
	}); 

}]);