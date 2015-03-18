require('angular/angular');

var musicApp = angular.module('musicApp', []);

//services
require('./services/resource_service')(musicApp);

//controllers
require('./users/controllers/users_controller')(musicApp);

//directives
require('./users/directives/create_user_directive')(musicApp);

musicApp.config(['$routeProvider', function($routeProvider){

}]);
