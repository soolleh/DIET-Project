(function () {
'use strict';

angular.module('data')
.controller('categoriesListController', categoriesListController);


categoriesListController.$inject = ['items'];
function categoriesListController(items) {
  var categoryList = this;
  categoryList.items = items.data;
  //console.log(items.data);
}

})();