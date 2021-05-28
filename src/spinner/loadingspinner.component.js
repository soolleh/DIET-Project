(function () {
'use strict';

angular.module('Spinner')
.component('loadingSpinner', {
  templateUrl: 'src/spinner/loadingspinner.template.html',
  controller: SpinnerController
});


SpinnerController.$inject = ['$rootScope']
function SpinnerController($rootScope) {
  var $ctrl = this;
  var cancellers = [];

  $ctrl.$onInit = function () {
    var cancel = $rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams, options){
      $ctrl.showSpinner = true;
    });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeSuccess',
    function(event, toState, toParams, fromState, fromParams){
      $rootScope.title = toState.data.title;
      console.log(toState.data.title);
      $ctrl.showSpinner = false;
      $ctrl.error = false;
    });
    cancellers.push(cancel);

    cancel = $rootScope.$on('$stateChangeError',
    function(event, toState, toParams, fromState, fromParams, error,rejection){
      $ctrl.showSpinner = false;
      event.preventDefault();
      $ctrl.error = "Show Error";
      $ctrl.errorText = error.statusText;
      
    });
    cancellers.push(cancel);
  };

  $ctrl.$onDestroy = function () {
    cancellers.forEach(function (item) {
      item();
    });
  };

};
})();
