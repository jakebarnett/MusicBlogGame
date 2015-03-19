module.exports = function(app) {
  app.controller('songsController', ['$scope', 'resource', function($scope, resource) {

    $scope.songs = [];

    var Song = resource('songs');

    $scope.upVote = function(song) {
      song.points = song.points + 1;
      Song.save(song, function() {
        console.log('booya');
      });
    };

    $scope.downVote = function(song) {
      song.points = song.points - 1;
      Song.save(song, function() {
        console.log('booya');
      });
    }

    $scope.getAllSongs = function() {
      Song.getAll(function(data) {
        $scope.songs = data
      });
    };

    $scope.addNew = function(song) {
      Song.create(song, function(data) {
        $scope.songs.push(data);
      });
    };

  }]);
}
