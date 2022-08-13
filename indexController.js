var app = angular.module('myApp', ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "home.html"
        })
        .when("/activity", {
            templateUrl: "activity.html"
        })
        .when("/aboutus", {
            templateUrl: "aboutus.html"
        })
        .when("/shop", {
            templateUrl: "shop.html"
        })
        .when("/shop1", {
            templateUrl: "shop1.html"
        })
        .when("/contactus", {
            templateUrl: "contactus.html"
        })
        .when("/modalbox", {
            templateUrl: "modalbox.html"
        })
        .when("/checkout", {
            templateUrl: "checkout.html"
        })
        .otherwise({
            templateUrl: "home.html"
        })
});

app.controller('myCtrl', function ($scope, $http, $timeout) {
    function getData() {
        $http.get('data.json').then(function (rspt) {
            if (localStorage.getItem("data") == null) {
                localStorage.setItem("data", JSON.stringify(rspt.data));
                $scope.datalang = JSON.parse(localStorage.getItem("data"));
            }
            else {
                localStorage.setItem("data", JSON.stringify(rspt.data));
                $scope.datalang = JSON.parse(localStorage.getItem("data"));
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
            $scope.newArrival = [
                [
                    $scope.datalang.product[1],
                    $scope.datalang.product[12],
                    $scope.datalang.product[20],
                    $scope.datalang.product[25]
                ],
                [
                    $scope.datalang.product[30],
                    $scope.datalang.product[32],
                    $scope.datalang.product[33],
                    $scope.datalang.product[45],
                ]

            ]
            $scope.information = [
                $scope.datalang.activities[1],
                $scope.datalang.activities[5],
                $scope.datalang.activities[10],
                $scope.datalang.activities[14],
            ]
            $scope.activities = $scope.datalang.activities
        })
    }
    getData();
    $scope.Popup = false;
    $scope.translate = function (lang) {
        $scope.language = lang;
        $scope.freetext = $scope.datalang.freetext[$scope.language];
    }
    $scope.navigation = screen.width <= 750 ? false : true
    $scope.shownavigation = function () {
        $scope.navigation = !$scope.navigation
    }
    $scope.selectedproduct = 0
    $scope.showPopup = function (id) {
        id != undefined ? $scope.selectedproduct = id : true
        $scope.Popup = !$scope.Popup;
        $scope.datalang.product.forEach(item => {
            item.id == id ? $scope.selectedproduct = item : true;
        });
    }
    $scope.cart = [];
    $scope.cartQuantity = 0;
    $scope.totalAmount = 0;
    $scope.updateCart = function (product, add) {
        for (let i = 0; i <= $scope.cart.length; i++) {
            if (add) {
                if ($scope.cart[i] == undefined) {
                    $scope.cart[$scope.cart.length] = product
                    $scope.cart[i].quantity = 1
                    $scope.cartQuantity++
                    $scope.totalAmount += $scope.cart[i].price
                    break
                }
                else if ($scope.cart[i].id == product.id) {
                    $scope.cart[i].quantity++
                    $scope.cartQuantity++
                    $scope.totalAmount += $scope.cart[i].price
                    break
                } else if (i == $scope.cart.length - 1) {
                    product.quantity = 1
                    $scope.cart[$scope.cart.length] = product
                    $scope.cartQuantity++
                    $scope.totalAmount += $scope.cart[i].price
                    break
                }
            } else if (!add) {
                if ($scope.cart[i].id == product.id) {
                    $scope.cart[i].quantity--
                    $scope.cartQuantity--
                    $scope.totalAmount -= $scope.cart[i].price
                    if ($scope.cart[i].quantity <= 0) {
                        $scope.cart.splice(i, 1);
                    }
                    break
                }
            }
        }
    }
    $scope.removeall = function () {
        if (window.confirm("Do you want to remove all items?")) {
            $scope.cart = [];
            $scope.cartQuantity = 0;
            $scope.totalAmount = 0;
        }
    }
    $scope.loader = false
    $scope.shownLoader = function () {
        if (window.confirm("Do you want to purchage?")) {
            $scope.loader = !$scope.loader
            if ($scope.loader) {
                $timeout(function () {
                    $scope.loader = false;
                    $scope.checkout_popup = false;
                    $scope.cart = [];
                    $scope.cartQuantity = 0;
                    $scope.totalAmount = 0;
                    alert("Purchage Successfully")
                }
                    , 2000);
            }
        }

    }
    $scope.name = "buddy"
    $scope.checkout_popup = false
    $scope.showCheckout_popup = function () {
        $scope.checkout_popup = !$scope.checkout_popup
    }
    $scope.countDownHideCheckout = function () {
        $scope.loader = false
    }
    $scope.visitor = 100
    window.onload = function () {
        if (localStorage.getItem("counter")) {
            $scope.visitor = localStorage.getItem("counter");
            $scope.visitor = parseInt($scope.visitor);
        }
        $scope.visitor++;
        localStorage["counter"] = $scope.visitor;
        $scope.name = window.prompt("Welcome to our website\nWhat's your name?")
        console.log($scope.name);
    }
    $scope.sendmsg = function(contact_name,email){
        var reEmal = /^\w+[@]\w+[.]\w+([.]\w+)?$/;
        if(contact_name == undefined){
            alert("Name can not be blank")
        }else if(email == ""){
            alert("Email can not be blank")
        }else if(!reEmal.test(email)){
            alert("Wrong format email")
        }
        else{
            alert("Thanks for your message")
        }
    }
});