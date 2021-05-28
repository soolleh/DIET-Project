(function() {
"use strict";

angular.module('common')
.factory('loadingHttpInterceptor', LoadingHttpInterceptor);

LoadingHttpInterceptor.$inject = ['$rootScope', '$q'];
/**
 * Tracks when a request begins and finishes. When a
 * request starts, a progress event is emitted to allow
 * listeners to determine when a request has been initiated.
 * When the response completes or a response error occurs,
 * we assume the request has ended and emit a finish event.
 */
function LoadingHttpInterceptor($rootScope, $q) {

  var loadingCount = 0;
  var loadingEventName = 'spinner:activate';

  return {
    request: function (config) {
      //console.log("Inside interceptor, config: ", config);
      //console.log(statusText);
      if (++loadingCount === 1) {
        $rootScope.$broadcast(loadingEventName, {on: true});
        $rootScope.error = false;
      }

      return config;
    },

    response: function (response) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast(loadingEventName, {on: false});
        $rootScope.error = false;
        //console.log(response);
      }

      return response;
    },

    responseError: function (response) {
      if (--loadingCount === 0) {
        $rootScope.$broadcast(loadingEventName, {on: false});
        $rootScope.error = "Something Went wrong couldn't fetch data from server";
      }

      return $q.reject(response);
    }
  };
}

})();
