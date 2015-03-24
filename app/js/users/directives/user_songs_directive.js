module.exports = function(app) {
  app.directive('userSongsDirective', function() {
    return {
      restrict: 'A',
      templateUrl: '/templates/users/directives/user_songs_directive.html',
      replace: true
    };
  });
};
