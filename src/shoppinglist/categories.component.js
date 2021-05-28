(function () {
'use strict';

angular.module('data')
.component('categoryList', {
  templateUrl: 'src/shoppinglist/templates/categoryList.template.html',
  bindings: {
    items: '<'
  },
  controllerAs:'categoryList'
});
})();