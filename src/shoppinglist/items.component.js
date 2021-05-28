(function () {
'use strict';

angular.module('data')
.component('itemDetail', {
  templateUrl: 'src/shoppinglist/templates/itemDetail.template.html',
  bindings: {
    items: '<'
  },
  controllerAs:'itemDetails'
});
})();