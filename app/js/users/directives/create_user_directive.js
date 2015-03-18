module.exports = function(app) {
  app.directive('createUserDirective', function() {
    return {
      restrict: 'A',
      templateUrl: '/templates/users/directives/create_user_directive.html',
      replace: true
    };
  });
};
