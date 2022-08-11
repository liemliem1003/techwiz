var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/home", {
        templateUrl : "home.html"
    })
    .when("/activity", {
        templateUrl : "activity.html"
    })
    .when("/aboutus", {
        templateUrl : "aboutus.html"
    })
    .when("/shop", {
        templateUrl : "shop.html"
    })
    .when("/shop1", {
        templateUrl : "shop1.html"
    })
    .when("/contactus", {
        templateUrl : "contactus.html"
    })
    .when("/modalbox", {
        templateUrl : "modalbox.html"
    })
    .otherwise({
        templateUrl : "home.html"
    })
});

app.controller('myCtrl',function($scope, $http){
    function getData(){
        $http.get('data.json').then(function(rspt) {
            if(localStorage.getItem ("data") == null) {
                localStorage.setItem("data", JSON.stringify(rspt.data));   
                $scope.datalang= JSON.parse(localStorage.getItem("data"));  
            }     
            else{
                localStorage.setItem("data", JSON.stringify(rspt.data));   
                $scope.datalang= JSON.parse(localStorage.getItem("data"));
            }
            $scope.language = "en"
            $scope.freetext = $scope.datalang.freetext[$scope.language]
            // console.log($scope.freetext);
        })
    }
    getData();
    $scope.Popup = false;
    $scope.translate = function(lang){
        $scope.language = lang;
        $scope.freetext = $scope.datalang.freetext[$scope.language];
    }
    $scope.shownavigation = function(){
        var obj = document.getElementById("right-container").style.display
        document.getElementById("right-container").style.display = obj == "block" ? "none" : "block"
    }
    $scope.showPopup = function(){
        $scope.Popup = !$scope.Popup;
        console.log($scope.Popup);
    }
});