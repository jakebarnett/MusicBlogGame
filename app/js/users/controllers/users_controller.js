module.exports = function(app) {
  app.controller('usersController', ['$scope', 'resource', '$http', '$cookies', '$location', '$sce' ,
  function($scope, resource, $http, $cookies, $location, $sce) {

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
       $location.path('/');
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
      .success(function(songs) {
        console.log(songs);
        user.songs = songs;
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

  }]);
};
