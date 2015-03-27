'use strict';

require('../../app/js/client');
require('angular-mocks');

describe('users controller', function () {
  var $ControllerConstructor;
  var $httpBackend;
  var $scope;  

  beforeEach(angular.mock.module('musicApp'));

  beforeEach(angular.mock.inject(function($rootScope, $controller) {
    $scope = $rootScope.$new();
    $ControllerConstructor = $controller; 
  }));

  it('should be able to create a controller', function() {
    var usersController = $ControllerConstructor('usersController', {$scope: $scope});
    expect(typeof usersController).toBe('object');
    expect(Array.isArray($scope.users)).toBe(true);
  });

  describe('REST requests', function() { 
    beforeEach(angular.mock.inject(function(_$httpBackend_) {
      $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should have a getAllUsers function', function() {
      $httpBackend.expectGET('/user').respond(200, [{username: 'testDude'}]);

      var usersController = $ControllerConstructor('usersController', {$scope: $scope});
      $scope.getAllUsers();
      $httpBackend.flush();

      expect($scope.users[0].username).toBe('testDude');
    });

    it('should be able to create a new user', function() {
      $httpBackend.expectPOST('/user').respond(200, {_id: 1, username: 'testMan'});

      var usersController = $ControllerConstructor('usersController', {$scope: $scope});
      $scope.createUser({username: 'testMan'});
      $httpBackend.flush();

      //expect statements
 
    });

    it('should be able save user changes', function() {
      $httpBackend.expectPUT('/user/1').respond(200);

      var usersController = $ControllerConstructor('usersController', {$scope: $scope});
      var user = {username: 'testPerson', _id: 1, editing: true};
      $scope.save(user);
      $httpBackend.flush();

      expect(user.editing).toBe(false);
    });

    // it('should sign in an existing user', function() {
    //   $httpBackend.expectGET('/sign_in').respond(200);

    //   var usersController = $ControllerConstructor('usersController', {$scope: $scope});

    //   $scope.existingUser.basic = {email:"test@email.com", password:"test"};
    //   var user = {username: 'testPerson', _id: 1, editing: true};
      
    //   $scope.signIn(user);
    //   httpBackend.flush();

    // });

  });
});