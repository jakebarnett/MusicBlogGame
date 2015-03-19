module.exports = function(app) {
  app.directive('voteOnSongDirective', function() {
    return {
      restrict: 'A',
      templateUrl: '/templates/songs/directives/vote_on_song_directive.html',
      replace: true
    };
  });
};
