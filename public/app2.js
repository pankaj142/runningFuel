(function(){
 	var app = angular.module('myApp', []);
 	app.controller('registrationCntrl',function($scope,$http){
 		console.log("hey hi from controller")
 		
 		
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

 			console.log('hello')
 			console.log(regUserInfo)

	        $http
	            .post('/api/register', regUserInfo)
	            .then(function(){
	            	console.log("user reg data is send to server");
	            });
	           
     
 		}

 		
 	})


})()