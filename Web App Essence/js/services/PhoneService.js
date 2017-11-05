'use strict'

app.factory('PhoneService',function($http){
	return{
		getPhonesInformation : function(){
			return $http.get('http://localhost:8080');
		}
	}
});