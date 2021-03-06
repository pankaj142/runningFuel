    var app = angular.module('myApp', ['ngRoute']);


    // configure our routes
    app.config(function($routeProvider) {
        $routeProvider
            // route for the home page
             .when('/home', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
            })
             .when('/testpage', {
                templateUrl : 'pages/testpage.html'
            })
            .when('/register', {
                templateUrl : 'pages/registration.html',
                controller  : 'registrationController'
            })
            .when('/login', {
                templateUrl : 'pages/login.html',
                controller  : 'loginController'
            })
            // route for the about page
            .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
            })

             .when('/getpetrol', {
                templateUrl : 'pages/getpetrol.html',
                controller  : 'getPetrolController'
            })

             .when('/getpage', {
                templateUrl : 'pages/getpetrol.html'
                
            })

              .when('/petrolpumpdetail', {
                templateUrl : 'pages/petrolpumpdetail.html',
                controller  : 'petrolPumpDetailController'
           	  })

           	  .when('/mapdetail', {
                templateUrl : 'pages/mapdetail.html',
                controller  : 'mapDetailController'
           	  })

              .when('/providerlist', {
                templateUrl : 'pages/providerList.html',
                controller  : 'providerListController'
              })

              .when('/providerlogin', {
                templateUrl : 'pages/providerlogin.html',
                controller  : 'providerLoginController'
              })

              .when('/providerregister', {
                templateUrl : 'pages/providerregister.html',
                controller  : 'providerRegisterController'
              }); 
         /*	var path;
         	if(localStorage.getItem("loginStatus")==true){
         		path='/contact.html';
         	}else{
         		path='/login';
         	}
         	$routeProvider.otherwise({
		       redirectTo: path
		    });

		    */
		    $routeProvider.otherwise({
		    	redirectTo:'/home'
		    })
    });

    // create the controller and inject Angular's $scope
    app.controller('mainController', function($scope,$rootScope) {
        // create a message to display in our view
        $scope.message = 'Everyone come and see how good I look!';
        if(localStorage.getItem("loginStatus")==true){
        	$rootScope.loginStatus=true;
        }else{
        	$rootScope.loginStatus=false;
        }
        $scope.logOut=function(){
     			localStorage.setItem("loginStatus",false);
     			localStorage.setItem("id",null)
     			$rootScope.loginStatus=false;
     		}
    });

    app.controller('aboutController', function($scope) {
        $scope.message = 'Look! I am an about page.';
    });

    app.controller('contactController', function($scope) {
        $scope.message = 'Its contact page';
    });

     	app.controller('registrationController',function($scope,$http,$location)
     	{
 		//console.log("hey hi from controller")
        //console.log(email)
 		//console.log(regUserInfo)
 		$scope.register =function(){
 			var userName=document.getElementById('username').value;
 			var email= document.getElementById('email').value;
	 		var mobileNumber =document.getElementById('mobileNumber').value;
	 		var adharNumber =document.getElementById('adharNumber').value;
	 		var licenceNumber = document.getElementById('licenceNumber').value;
	 		var password =document.getElementById('password').value;

	 		var regUserInfo={
	 			userName:userName,
	 			email:email,
	 			mobileNumber:mobileNumber,
	 			adharNumber:adharNumber,
	 			licenceNumber:licenceNumber,
	 			password:password
 			}

 			//console.log(regUserInfo)

	        $http
	            .post('/api/register', regUserInfo)
	            .then(function(){
	            	console.log("user reg data is send to server");
	            });
 		}
	
 	})
     	app.controller("loginController",function($scope,$rootScope,$http,$location){
     		console.log('hello from login controller')
     		$scope.login= function(){
     			var email= document.getElementById('email').value;
     			var password =document.getElementById('password').value;
     			var userCredentials={
     				email:email,
     				password:password
     			}

     			console.log(userCredentials)
     			var data=userCredentials.email+"yyyyy"+userCredentials.password;
     			$http
     				.get('api/login/'+data)
     				.then(function(response){
     					console.log(response)
     					console.log(response.data[0]._id)
     					console.log('user login credentials are sent to server')
     					localStorage.setItem("id",response.data[0]._id)
     					localStorage.setItem("username",response.data[0].userName)
     					localStorage.setItem("adharNumber",response.data[0].adharNumber)
     					localStorage.setItem("licenceNumber",response.data[0].licenceNumber)
     					localStorage.setItem("mobileNumber",response.data[0].mobileNumber)
     					localStorage.setItem("loginStatus","true")

     					$rootScope.loginStatus=true;
     					$location.path( "/getpetrol" );
     					console.log(localStorage.getItem("loginStatus"))
     				})
     		}
     	})

     	app.controller("getPetrolController",function($scope,$rootScope,$location){
     		$scope.message="hey hello";
     		$scope.logOut= function(){
     			localStorage.setItem("id",null)
     			localStorage.setItem("loginStatus",false)
     			$location.path("/home")
     		}
     		$scope.mapfun= function(){
     			//location.reload();
     			console.log('page reloaded');
     			//$location.path('/mapdetail');
     			//window.location.href="/pages/mapdetail.html";
     			window.open('/pages/mapdetail.html', '_blank');
     			//console.log(localStorage.getItem("details111"));
     			//console.log(JSON.stringify(localStorage.getItem("details111")));
     			var arr =JSON.stringify(localStorage.getItem("details111")).split("**");
     			//console.log(arr.constructor.name);
     			var first=arr[0].split(";,")
     			console.log("name=="+first[0])
     			console.log("adrs=="+first[1])
     			var second=arr[1].split(";,")
     			console.log("name=="+second[0])
     			console.log("adrs=="+second[1])
     			 $scope.petrolPumbs=[]
     			for(var i=0;i<5;i++){
     				var first=arr[i].split(";,")
     				var name=first[0];
     				var addr=first[1];
     				console.log("name----"+name.replace(",",""));
     				console.log("address----"+addr.replace(/\S+/,''));
     				$scope.petrolPumbs.push({name:name.replace(",", "").replace('\"', ""),addr: addr.replace('\"', "")})
     			}
     			//console.log($scope.petrolPumbs)
     			//var brr=arr.split(";,");
     			//console.log(brr)
     		}
     		$scope.detail=function(petrolPumpDetail){
     			//console.log(petrolPumpDetail)
     			$rootScope.petrolDetail=petrolPumpDetail;
     			$location.path("/petrolpumpdetail")
     		}
     	})

     	app.controller("petrolPumpDetailController", function($scope,$http){
     		$scope.buyPetrol =function(data){
     			//console.log('detail',data)
     			//console.log("you will get petrol in 15 minutes")
     			var info={
     				userId:localStorage.getItem("id"),
     			    username:localStorage.getItem("username"),
     			    adharNumber: localStorage.getItem("adharNumber"),
     			    licenceNumber: localStorage.getItem("licenceNumber"),
     			    mobileNumber: localStorage.getItem("mobileNumber"),
     			    petrolPumpName:data.name,
     			    petrolPumbAddr:data.addr
     			}
     			//console.log(info)
     			$http
		            .post('/api/requestData', info)
		            .then(function(response){
		            	console.log(response) 
		            });
     		}
     	})
     	app.controller("mapDetailController",function($scope){
     		$scope.msg="hello"
     	})

        app.controller("providerController",function($scope){
            $scope.msg="this is provider controller"
        })

        app.controller("providerController",function($scope){
            $scope.getList= function(){

            }
        })

        app.controller("providerLoginController", function($scope,$http,$location){
            $scope.msg="this is providerLoginController";
            $scope.providerlogin=function(){
                var email= document.getElementById('email').value;
                var password =document.getElementById('password').value;

            var providerLoginData={
                email:email,
                password:password
            }
            //console.log(providerLoginData)
            $http
                .post('/api/provider/login', providerLoginData)
                .then(function(){
                    //console.log(response)
                    $location.path('/providerlist');
                    //console.log("user providerLoginData data is send to server");
                    localStorage.setItem("providerEmail",providerLoginData.email)    
                });

            }
           // $location.path('/providerlist');
        })

        app.controller("providerRegisterController",function($scope,$http){
            $scope.msg="this is providerRegisterController";
        })

        app.controller("providerListController",function($scope,$http,$rootScope){
            var providerEmail=localStorage.getItem("providerEmail")
            var data=providerEmail+"zzzz"+"Survey No. - 274, Baner Road, Near Mauli Garden, Pune";
            $scope.getList= function(){
                $http
                    .get('api/provider/reguestlist/'+data)
                    .then(function(response){
                        //console.log(response.data)
                        $rootScope.requestList=response.data;
                        //console.log(response.data[0])
                    })
            }
        })