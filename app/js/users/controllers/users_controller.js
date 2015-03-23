module.exports = function(app) {
  app.controller('usersController', ['$scope', 'resource', '$http', '$cookies', '$location',
  function($scope, resource, $http, $cookies, $location) {

    $scope.users = [];

    var User = resource('user');
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
