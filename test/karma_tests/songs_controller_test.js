'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('songs controller', function () {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;  

  beforeEach(angular.mock.module('musicApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller; 
  }));

  it('should be able to create a controller', function() {
    var songsController = $ControllerConstructor('songsController', {$scope: $scope});
    expect(typeof songsController).toBe('object');
    expect(Array.isArray($scope.songs)).toBe(true);
  });

  describe('REST requests', function() { 
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a getAllSongs function', function() {
      $httpBackend.expectGET('/songs').respond(200, [{songUrl: 'testurl'}]);

      var songsController = $ControllerConstructor('songsController', {$scope: $scope});
      $scope.getAllSongs();
      $httpBackend.flush();

      expect($scope.songs[0].songUrl).toBe('testurl');
    });

    it('should be able to add a new song', function() {
      $httpBackend.expectPOST('/songs').respond(200, {_id: 1, songUrl: 'testurl'});

      var songsController = $ControllerConstructor('songsController', {$scope: $scope});
      $scope.addNew({_id: 1, songUrl: 'testurl'});
      $httpBackend.flush();

      expect($scope.songs[0]._id).toBe(1);
    });

    it('should be able to upVote a song', function() {
      $httpBackend.expectPUT('/songs/1').respond(200, {_id: 1, songUrl: 'testurl', points: 1});

      var songsController = $ControllerConstructor('songsController', {$scope: $scope});
      $scope.upVote({_id: 1, songUrl: 'testurl', points: 0});
      $httpBackend.flush();
    });

    it('should be able to downVote a song', function() {
      $httpBackend.expectPUT('/songs/1').respond(200, {_id: 1, songUrl: 'testurl', points: 0});

      var songsController = $ControllerConstructor('songsController', {$scope: $scope});
      $scope.downVote({_id: 1, songUrl: 'testurl', points: 1});
      $httpBackend.flush();
    });

    it('should be able to change user remaining votes', function() {
      $httpBackend.expectPUT('/user/1').respond(200, {_id: 1, remainingVotes: 4});

      var songsController = $ControllerConstructor('songsController', {$scope: $scope});
      $scope.changeVotes({_id: 1, remainingVotes: 5});
      $httpBackend.flush();
    });

    it('should be able to change submission status', function() {
      $httpBackend.expectPUT('/user/1').respond(200, {_id: 1, hasSubmitted: true});

      var songsController = $ControllerConstructor('songsController', {$scope: $scope});
      $scope.changeSubmissionStatus({_id: 1});
      $httpBackend.flush();
    });

  });
});