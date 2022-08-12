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
    .when("/checkout", {
        templateUrl : "checkout.html"
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

            $scope.listItemUpToType = {}
            for (let i = 0; i < Object.keys($scope.datalang.product_type).length; i++) {
                $scope.listItemUpToType[i] = []
            }
            for (let i = 0; i < $scope.datalang.product.length; i++) {
                for (let j = 0; j < Object.keys($scope.datalang.product_type).length; j++) {
                    if ($scope.datalang.product[i].type == j) {
                        $scope.listItemUpToType[j][$scope.listItemUpToType[j].length] = $scope.datalang.product[i]
                    }
                }
            }
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
    $scope.selectedproduct = 0
    $scope.showPopup = function(id){
        id != undefined ? $scope.selectedproduct = id : true
        $scope.Popup = !$scope.Popup;
        $scope.datalang.product.forEach(item => {
            item.id == id ? $scope.selectedproduct = item : true;
        });
    }
    $scope.cart = [];
    $scope.cartQuantity = 0;
    $scope.updateCart = function(product,add){
        for (let i = 0; i <= $scope.cart.length; i++) {
            if(add){
                if($scope.cart[i] == undefined){
                    $scope.cart[$scope.cart.length] = product
                    $scope.cart[i].quantity = 1
                    $scope.cartQuantity++
                    break
                }
                else if($scope.cart[i].id == product.id){
                    $scope.cart[i].quantity++ 
                    $scope.cartQuantity++
                    break
                }else if(i == $scope.cart.length - 1){
                    product.quantity = 1
                    $scope.cart[$scope.cart.length] = product
                    $scope.cartQuantity++
                    break
                }
            }else if(!add){
                if($scope.cart[i].id == product.id){
                    $scope.cart[i].quantity-- 
                    $scope.cartQuantity--
                    if($scope.cart[i].quantity <= 0){
                        $scope.cart.splice(i, 1);
                    }
                    break
                }
            }
        }
    }
});