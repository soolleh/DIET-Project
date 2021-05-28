(function() {
"use strict";

angular.module('common')
.component('loading', {
  template: '<img src="images/spinner.svg" ng-if="$ctrl.show">',
  controller: LoadingController
});


LoadingController.$inject = ['$rootScope'];
function LoadingController ($rootScope) {
  var $ctrl = this;
  var listener;
  var cancellers = [];

  $ctrl.$onInit = function() {
    $ctrl.show = false;
    listener = $rootScope.$on('spinner:activate', onSpinnerActivate);

    var cancel = $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
      $rootScope.title = toState.data.title;
      // console.log(toState.data.title);
      var screenWidth = window.innerWidth;
      if (screenWidth < 768) {
      $("#collapsable-nav").collapse('hide');
    }
    });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams, options){
       $rootScope.title = toState.data.title;
      // console.log(toState.data.title);
    });
    cancellers.push(cancel);
  };

  $ctrl.$onDestroy = function() {
    listener();
  };

  $ctrl.$onDestroy = function () {
    cancellers.forEach(function (item) {
      item();
    });
  };

  function onSpinnerActivate(event, data) {
    $ctrl.show = data.on;
  }
}

})();
