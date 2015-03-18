module.exports = function(app) {
  app.controller('usersController', ['$scope', 'resource', function($scope, resource) {
    $scope.users = [];

    var User = resource('user');
    $scope.getAllUsers = function() {
      User.getAll(function(data) {
        $scope.users = data;
      });
    };

    $scope.createUser = function(user) {
      User.create(user, function(data) {
        $scope.users.push(data);
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
