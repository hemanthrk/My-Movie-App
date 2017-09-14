'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.temp'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');

  $routeProvider.otherwise({redirectTo: '/view1'});
}]).
controller('myApp.controller',['$scope','$http', 'GETMOVIE',function($scope, $http, GETMOVIE){

				
				
				$scope.data = GETMOVIE.query({},function(result){
					console.log("GETMOVIE call",$scope.data.results[0]);
					$scope.movie = $scope.data.results[0];
					$scope.backgroundpath = $scope.data.results[0].backdrop_path;
					$scope.setBackGndUrl($scope.backgroundpath);
					$scope.posterpath = $scope.data.results[0].poster_path;
					console.log("poster path is ",$scope.posterpath);

					$scope.backimgu = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+$scope.posterpath;
					$scope.backgroundurl = 'https://image.tmdb.org/t/p/w1400_and_h450_bestv2'+$scope.backgroundpath;

					// $scope.posterp = {
     // 					background: 'url("https://image.tmdb.org/t/p/w300_and_h450_bestv2'+$scope.posterpath+'") no-repeat'
     // 				};

				

     				// $http.get('https://image.tmdb.org/t/p/w300_and_h450_bestv2' + $scope.posterpath).then(function(img){
     				// 	console.log("img is ",img);
     				// 	$scope.posterp = img;
     				// });

				});

				$scope.setBackGndUrl = function(bpart){
					
					
     				$scope.path = {
     					background: 'url("https://image.tmdb.org/t/p/w1400_and_h450_bestv2'+bpart+'") no-repeat'
     				};

     				
     				
				}

				

				// $http.get('https://api.themoviedb.org/3/search/multi?api_key=2d7ae88493c45364c094cab420adf070&language=en-US&query=shawshank').then(function(response) {
    //     		//self.movie = response.data;
    //    			 console.log(response.data.results[0]);
    //    			 $scope.movie = response.data.results[0];
    //    			 console.log($scope);
    //  			 });

	 
}]).
directive('myMovie',['GETMOVIE',function(GETMOVIE){

	

	console.log("inside directive");
	return {
		scope: false,
		restrict: 'E',
		templateUrl : 'movieTemplate/my-movie.template.html',
		link: function($scope, element, attrs){
			console.log("inside link function in directive ", $scope, element[0].querySelectorAll('btn btn-outline-success'));



			element.on('click',function(e){
				e.preventDefault();

				if(e.target.className == "btn btn-outline-success"){
					var morTName = document.getElementsByClassName("form-control")[0]
					console.log(morTName.value);
					if(morTName.value !== ""){

					GETMOVIE.query({movieName: morTName.value},function(resp){
						console.log('get new movie resp is ',resp)

						
							$scope.movie = resp.results[0];
						$scope.posterpath = resp.results[0].poster_path;
						$scope.backgroundpath = resp.results[0].backdrop_path;
					

						
					});//end of getmovie

					$scope.$watch(function(){
						console.log("inside watch", $scope)
					
						$scope.backimgu = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2'+$scope.posterpath;
						$scope.backgroundurl = 'https://image.tmdb.org/t/p/w1400_and_h450_bestv2'+$scope.backgroundpath;

						var elemdiv = element[0].querySelectorAll('section .poster');
     					elemdiv[0].style.backgroundImage = 'url(' + $scope.backimgu + ')';

     					var elemdiv_back = element[0].querySelectorAll('.movies');
     					elemdiv_back[0].style.backgroundImage = 'url(' + $scope.backgroundurl + ')';

					})

					
     				
     				
     				
				
						
					}//end of if loop to check for movie or tv show name entered
				}//end of if loop to check click event

				
			});


		}//end of link function of directive

	};
}]).
directive('backImg',function(){

	return{
		link: function($scope, element,attrs){
			console.log("inside backimg directive", $scope,element)
			var url = $scope.backimgu;
        element.css({
            'background-image': 'url(' + url +')',
            'background-repeat' : 'no-repeat'
        });

        

		}
	};
});
