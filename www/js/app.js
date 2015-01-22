// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','googleplus'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(['GooglePlusProvider', function(GooglePlusProvider) {
     GooglePlusProvider.init({
        clientId: '525447299557-32gmltal4ahki7tqnntdq4b1berbevgk.apps.googleusercontent.com',
        apiKey: 'c6M5Z4pP13KONpwl4vgVvQEa'
     });
}])

.controller('LoginCtrl', function ($scope, GooglePlus, $ionicPlatform) {
  $scope.facebookLogin = function () {
    alert('Facebook Login');
  }

  $scope.googlePlusLogin = function () {
    if (ionic.Platform.isWebView()){
      // Usando o plugin do cordova para fazer login
      window.plugin.googleplus.login({
        'iOSApiKey':''
      },
      function (user) {
        $scope.user = user;
      },
      function (err) {
        console.log('Erro: '+err);
      });
      
    } else {
      // Usando a lib do angular para fazer login
      GooglePlus.login().then(function (res) {
        GooglePlus.getUser().then(function (user) {
          $scope.user = user;
        });
      }, function (err) {
        console.log(err)
      });  
    }
  }

  $scope.logout = function () {
    gapi.auth.signOut();
    $scope.user = null;
  }
})