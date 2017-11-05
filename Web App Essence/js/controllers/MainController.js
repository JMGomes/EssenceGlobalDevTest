'use strict'


app.controller("MainController", function($scope, PhoneService) {

    $scope.phones_array = [];
    $scope.stringToSearch = "";


    //extract data from PhonesService.getPhonesInformation asynchronous REQUEST 
    PhoneService.getPhonesInformation().then(function(response) {
        $scope.phones_array = response.data;
        console.log($scope.phones_array);
    });
});