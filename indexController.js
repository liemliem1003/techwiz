var app = angular.module('myApp', ["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider
    .when("/home", {
        templateUrl : "home.html"
    })
    .when("/comparison", {
        templateUrl : "comparison.html"
    })
    .when("/aboutus", {
        templateUrl : "aboutus.html"
    })
    .when("/stylist_detail", {
        templateUrl : "stylist_detail.html"
    })
    .when("/collection", {
        templateUrl : "collection.html"
    })
    .when("/stylist", {
        templateUrl : "stylist.html"
    })
    .when("/product", {
        templateUrl : "product.html"
    })
    .otherwise({
        templateUrl : "home.html"
    })
});

app.controller('myCtrl',function($scope, $http){
    function getData(){
        $http.get('data.json').then(function(rspt){
            if(localStorage.getItem ("data") == null) {
                localStorage.setItem("data", JSON.stringify(rspt.data));   
                $scope.datalang= JSON.parse(localStorage.getItem("data"));  
            }     
            else{
                $scope.datalang= JSON.parse(localStorage.getItem("data"));
            }
        })
    }
    $scope.banner = "images/banner/banner00.jpg"
});