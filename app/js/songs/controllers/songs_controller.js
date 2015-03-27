module.exports = function(app) {
  app.controller('songsController', ['$scope', '$sce', 'resource', function($scope, $sce, resource) {

    $scope.songs = [];


    $scope.deliberatelyTrustDangerousSnippet = function(html) {
      return $sce.trustAsHtml(html);
    };

    var Song = resource('songs');
    var User = resource('user');

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
    };

    $scope.getAllSongs = function() {
      Song.getAll(function(data) {
        $scope.songs = data
      });
    };

    $scope.changeVotes = function(user) {
      user.remainingVotes = user.remainingVotes - 1;
      User.save(user, function() {
        console.log('-1 vote')
      });
    }

    $scope.checkValue = function(user) {
      if (user.remainingVotes < 1) {
        user.bonusPoints = user.bonusPoints + 5;
        User.save(user, function() {
          console.log('happy');
        })
      }
    };

    $scope.changeSubmissionStatus = function(user) {
      user.hasSubmitted = true;
      user.bonusPoints = user.bonusPoints + 5;
      User.save(user, function() {
        console.log('submission accepted')
      })
    };

    $scope.addNew = function(song) {
      Song.create(song, function(data) {
        $scope.songs.push(data);
      });
    };

  }]);
}
