module.exports = function(app) {
  var handleError = function(data) {
    console.log(data);
  };

  app.factory('resource', ['$http', function($http) {
    return function(resourceName) {
      return {
        getAll: function(callback) {
          $http({
            method: 'GET',
            url: '/' + resourceName
          })
          .success(callback)
          .error(handleError);
        },

        create: function(resource, callback) {
          $http({
              method: 'POST',
              url: '/' + resourceName,
              data: resource
          })
          .success(callback)
          .error(handleError);
        },

        save: function(resource, callback) {
          $http({
              method: 'PUT',
              url: '/' + resourceName + '/' + resource._id,
              data: resource
          })
          .success(callback)
          .error(handleError);
        }
      };
    };
  }]);
};
