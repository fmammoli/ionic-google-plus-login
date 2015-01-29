// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','googleplus', 'facebook'])

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

.config(['FacebookProvider',function(FacebookProvider) {
  FacebookProvider.init('418299155015136');
}])
.config(['GooglePlusProvider', function(GooglePlusProvider) {
     GooglePlusProvider.init({
        clientId: '525447299557-32gmltal4ahki7tqnntdq4b1berbevgk.apps.googleusercontent.com',
        apiKey: 'c6M5Z4pP13KONpwl4vgVvQEa'
     });
}])

.controller('LoginCtrl', function ($scope, GooglePlus, $ionicPlatform, Facebook) {
  $scope.facebookLogin = function () {
    facebookConnectPlugin.login(["public_profile"],
      function (res) {
        facebookConnectPlugin.api('/me', ['public_profile'],
          function (user) {
            $scope.user = user;
          }
        );
    });
  }

  $scope.logout = function () {
    facebookConnectPlugin.logout(function (res) {
      alert('Logged out!');
    });
  }

  /*$scope.facebookLogin = function () {
    
    Facebook.login(function (response) {
      Facebook.api('/me', function (me) {
        $scope.user = me;
      });
    });
  }*/

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
    Facebook.logout();
    if (ionic.Platform.isWebView()){
      window.plugins.googleplus.disconnect(function (msg) {
        $scope.user = null;
      })  
    } else {
      gapi.auth.signOut(); 
      $scope.user = null;
    }
  }
})