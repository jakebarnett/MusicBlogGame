'use strict';

require('angular/angular');
require('angular-route');

var musicApp = angular.module('musicApp', ['ngRoute']);

//services
require('./services/resource_service')(musicApp);

//controllers
require('./users/controllers/users_controller')(musicApp);
require('./songs/controllers/songs_controller.js')(musicApp);

//directives
require('./users/directives/create_user_directive')(musicApp);
require('./songs/directives/vote_on_song_directive')(musicApp);
require('./songs/directives/add_new_song_directive')(musicApp);

musicApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/users', {
    templateUrl: 'templates/users/users_template.html',
    controller: 'usersController'
  })
  .when('/create_user', {
    templateUrl: 'templates/users/create_user_template.html',
  })
  .when('/songs', {
    templateUrl: 'templates/songs/songs_template.html',
    controller: 'songsController'
  })
  .when('/', {
    redirectTo: '/songs'
  })
  .otherwise({
    templateUrl: 'templates/four_oh_four.html'
  })
}]);
