(function () {
'use strict';

angular.module('data')
.constant('ApiBasePath','https://davids-restaurant.herokuapp.com/categories.json')
.constant('ApiBasePath2','https://davids-restaurant.herokuapp.com/menu_items.json?category=')
.service('MenuDataService', MenuDataService);



MenuDataService.$inject = ['$http', 'ApiBasePath','ApiBasePath2','$filter']
function MenuDataService($http, ApiBasePath,ApiBasePath2,$filter) {
  var service = this;
  service.getAllCategories = function () {
      var response =  $http({
        method: "GET",
        url: (ApiBasePath)
    });
    return response;
  };

  service.getItemsForCategory = function (categoryShortName,category) {
      var shortName =  $filter('uppercase')(categoryShortName);
      var response =  $http({
        method: "GET",
        url: (ApiBasePath2) + shortName
    });
      response.category = category;
    return response;
  };
}

})();