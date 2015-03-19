module.exports = function(app) {
  app.directive('addNewSongDirective', function() {
    return {
      restrict: 'A',
      templateUrl: '/templates/songs/directives/add_new_song_directive.html',
      replace: true
    };
  });
};
