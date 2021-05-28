(function () {
'use strict';

angular.module('data')
.controller('ItemDetailController', ItemDetailController);


ItemDetailController.$inject = ['item'];
function ItemDetailController(item) {
  var itemDetails = this;
  itemDetails.items = item.data.menu_items;
  itemDetails.category = item.data.category.name;
}
})();