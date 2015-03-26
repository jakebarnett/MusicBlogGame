module.exports = function(app) {

  app.controller('usersController', ['$scope', 'resource', '$http', '$cookies', '$location', '$base64', '$sce',
  function($scope, resource, $http, $cookies, $location, $base64, $sce) {


    $scope.users = [];

    $scope.deliberatelyTrustDangerousSnippet = function(html) {
      return $sce.trustAsHtml(html);
    };


    var User = resource('user');

    $scope.getUser = function(user) {
      $http.defaults.headers.common['eat'] = $cookies.eat;
      $http({
        method: 'GET',
        url: '/user/currentuser'
      })
      .error(function(data) {
       console.log(data);
      })
      .success(function(data) {
        $scope.user = data;
      });
    };

    $scope.getAllUsers = function() {
      User.getAll(function(data) {
        $scope.users = data;
      });
    };

    $scope.createUser = function(user) {
      $http({
       method: 'POST',
       url: '/user',
       data: $scope.newUser
     })
     .error(function(data) {
       console.log(data);
     })
     .success(function(data) {
       $cookies.eat = data.eat;
       $location.path('/songs');
     });
    };

    $scope.signIn = function(existingUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic: ' + $base64.encode($scope.existingUser.basic.email + ':' + $scope.existingUser.basic.password);
      $http.get('/sign_in')
      .error(function(data) {
        console.log(data);
      })
      .success(function(data) {
        $cookies.eat = data.eat;
        $location.path('/songs');
      });
    };

    $scope.save = function(user) {
      User.save(user, function() {
        user.editing = false;
      });
    };

    $scope.getSongs = function(user) {
      $http({
        method:'GET',
        url: '/userSongs/' + user._id
      })
      .error(function(data) {
        console.log(data);
      })
      .success(function(data) {
        console.log(data);
        user.songs = data.songs;
        user.points = data.points;
      });
    };

    $scope.editToggle = function(user) {
      if (user.editing) {
        user.avatar = user.oldAvatar;
        user.editing = false;
      } else {
        user.oldAvatar = user.avatar;
        user.editing = true;
      }
    };

    $scope.addBonusPoints = function(user) {
      user.bonusPoints = user.bonusPoints + 5;
      User.save(user, function() {
        console.log("5 bonus points!")
      });
    }

  }]);
};
