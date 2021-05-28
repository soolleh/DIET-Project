(function () {
'use strict';

angular.module('dietApp',['ui.router','common'])

angular.module('dietApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider','$locationProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider,$locationProvider) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/home');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/home',
    templateUrl: 'src/shoppinglist/templates/home.template.php',
    data:{
      title:"Home"
    }
  })

  // Premade list page
  .state('about-us', {
    url: '/about-us',
    templateUrl: 'src/shoppinglist/templates/about-us.template.html',
    data:{
      title:"About-Us"
    }
  })

   .state('about-us.info', {
    url: '/info',
    templateUrl: 'src/shoppinglist/templates/info.template.html',
    data:{
      title:"Info"
    }
  })

  .state('about-us.objectives', {
    url: '/objectives',
    templateUrl: 'src/shoppinglist/templates/objectives.template.html',
    data:{
      title:"Objectives"
    }
  })

  .state('about-us.mission', {
    url: '/mission',
    templateUrl: 'src/shoppinglist/templates/mission.template.html',
    data:{
      title:"Mission"
    }
  })
   .state('about-us.infrastructure', {
    url: '/infrastructure',
    templateUrl: 'src/shoppinglist/templates/infrastructure.template.html',
    data:{
      title:"Infrastructure"
    }
  })
    .state('about-us.principals-message', {
    url: '/principals-message',
    templateUrl: 'src/shoppinglist/templates/principals-message.template.html',
    data:{
      title:"Principal's Message"
    }
  })

    .state('departments', {
    url: '/departments',
    templateUrl: 'src/shoppinglist/templates/departmentList.template.html',
    controller: 'departmentListController as departmentList',
    data :{
      title:"Departments"
    },
    resolve: {
      items: ['DepartmentService', function (DepartmentService) {
        return DepartmentService.getAllDepartments();
      }]
    }
  })
  .state('department-Detail', {
    url: '/department-detail/{department_id}',
    templateUrl: 'src/shoppinglist/templates/department-detail.template.html',
    controller: "departmentDetailController as departmentDetail",
    data:{
      title:"Department Detail"
    },
    resolve: {
      item: ['DepartmentService','$stateParams', function (DepartmentService,$stateParams) {
        return DepartmentService.getDepartmentDetail()
        .then(function(item){
          return item.data[$stateParams.department_id];
        });
      }],
      faculty: ['DepartmentService','$stateParams', function (DepartmentService,$stateParams) {
        return DepartmentService.getDepartmentFacultyDetail($stateParams.department_id);
      }]
    } 
  })

    .state('faculty', {
    url: '/faculty-members',
    templateUrl: 'src/shoppinglist/templates/facultyList.template.html',
    controller: 'facultyListController as facultyList',
    data :{
      title:"Faculty-members"
    },
    resolve: {
      members: ['DepartmentService', function (DepartmentService) {
        return DepartmentService.getFacultyMembers();
      }]
    }
  });
  // $locationProvider.html5Mode(true);
}

//**********************************************************8service***********************************************
angular.module('dietApp')
.service('DepartmentService', DepartmentService);



DepartmentService.$inject = ['$http']
function DepartmentService($http) {
  var service = this;
  service.getAllDepartments = function () {
      var response =  $http({
        method: "GET",
        url: 'lib/departmentList_JSON.php'
    });
    return response;
  };

  service.getDepartmentDetail = function () {
      var response =  $http({
        method: "GET",
        url: "lib/department_detail.json"
    });
    return response;
  };
    service.getDepartmentFacultyDetail = function (department_id) {
      var response =  $http({
        method: "GET",
        url: "lib/department.faculty.details.php",
        params:{
          department_id:department_id
        }
    });
    return response;
  };
  service.getFacultyMembers = function(){
      var response =  $http({
        method: "GET",
        url: "lib/faculty_JSON.php"
    });
    return response;
  };
}

///***************************************************department-list.controller********************************
angular.module('dietApp')
.controller('departmentListController', departmentListController);


departmentListController.$inject = ['items'];
function departmentListController(items) {
  var departmentList = this;
  departmentList.items = items.data;
}

//*********************************************department-detail-controller***********************************************
angular.module('dietApp')
.controller('departmentDetailController', departmentDetailController);


departmentDetailController.$inject = ['$stateParams','item','faculty','$filter'];
function departmentDetailController($stateParams,item,faculty,$filter) {
  var departmentDetail = this;
  departmentDetail.items = item;
  departmentDetail.btn = true
  departmentDetail.faculty = faculty.data;
   departmentDetail.department = $stateParams.department_id;
   departmentDetail.departmentDesc = departmentDetail.items.department_details.split('.');
   departmentDetail.departmentDesc = $filter('limitTo')(departmentDetail.departmentDesc, departmentDetail.departmentDesc.length - 1)
   departmentDetail.showFn = function() {
      departmentDetail.show = true;
     departmentDetail.btn = false
   };
      departmentDetail.hideFn = function() {
      departmentDetail.show = false;
     departmentDetail.btn = true;
   };
   // console.log("final result",departmentDetail.departmentDesc);
}
//*********************************************faculty-detail-controller***********************************************
angular.module('dietApp')
.controller('facultyListController', facultyListController);


facultyListController.$inject = ['members','$timeout'];
function facultyListController(members,$timeout) {
  var facultyList = this;
    facultyList.members = members.data;
    facultyList.searchedMembers = [];
    facultyList.showFaculty=true;
    facultyList.showFull=false;
    facultyList.showSearchedFaculty = false;

    facultyList.searchResult = function(searchTerm){
      facultyList.loading = true;
      $timeout(function () {
      facultyList.searchedMembers =[];
      if (searchTerm == undefined || searchTerm =="") {
        facultyList.error = "Please Enter Seach Value";
        facultyList.loading = false;
      }
      else{
        angular.forEach(facultyList.members,function(val,i){
         if(val.official_name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           val.department.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1 ||
           val.designation.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1){
            if (val.designation.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
              facultyList.message = "From Designation";
            }
            if (val.official_name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
              facultyList.message = "From Name";
            }
            if (val.department.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
              facultyList.message = "From Department";
            }
            facultyList.error=false;
            facultyList.showFaculty=false;
            facultyList.showFull=true;
            facultyList.searchedMembers.push(val); 
            facultyList.showSearchedFaculty = true;
            facultyList.loading = false; 
          }
      });
      if(facultyList.searchedMembers == "" || facultyList.searchedMembers === undefined){
        facultyList.showFaculty=false;
        facultyList.showSearchedFaculty = false;
        facultyList.error = "No Data Found";
        facultyList.showFull=true;
        facultyList.loading = false;
      }
    }
    }, 1000);

  };
  facultyList.showFullList=function(){
    facultyList.loading = true;
    $timeout(function () {
      facultyList.error = false;
      facultyList.showFaculty=true;
      facultyList.showSearchedFaculty = false; 
      facultyList.showFull=false;
      facultyList.loading = false;
    }, 800);
  };
}
//***************************************spinner-module.js**********************************************8
angular.module('Spinner', []);

angular.module('Spinner')
.config(function () {
  // console.log("Spinner config fired.");
}).
run(function () {
  // console.log("Spinner run fired.");
});

//*************************************categories.component.js*********************************************

angular.module('dietApp')
.component('departmentList', {
  templateUrl: 'src/shoppinglist/templates/departmentList.component.html',
  bindings: {
    items: '<'
  },
  controllerAs:'departmentList'
});

//*******************************************8item detail.componenet.js**************************************
angular.module('dietApp')
.component('departmentDetail', {
  templateUrl: 'src/shoppinglist/templates/departmentDetail.component.html',
  bindings: {
    items: '<'
  },
  controllerAs:'departmentDetail'
});
//*******************************************loading.spinner.component.js*************************************8
// angular.module('Spinner')
// .component('loadingSpinner', {
//   templateUrl: 'src/spinner/loadingspinner.template.html',
//   controller: SpinnerController
// });


// SpinnerController.$inject = ['$rootScope']
// function SpinnerController($rootScope) {
//   var $ctrl = this;
//   var cancellers = [];

//   $ctrl.$onInit = function () {
//     var cancel = $rootScope.$on('$stateChangeStart',
//     function(event, toState, toParams, fromState, fromParams, options){
//       $ctrl.showSpinner = true;
//     });
//     cancellers.push(cancel);

//     cancel = $rootScope.$on('$stateChangeSuccess',
//     function(event, toState, toParams, fromState, fromParams){
//       $ctrl.showSpinner = false;
//     });
//     cancellers.push(cancel);

//     cancel = $rootScope.$on('$viewContentLoading', 
//     function(event, viewConfig){ 
//       $ctrl.showSpinner = true;
//     });
//     cancellers.push(cancel);

//     cancel = $rootScope.$on('$stateChangeError',
//     function(event, toState, toParams, fromState, fromParams, error,rejection){
//       $ctrl.showSpinner = false;
//       event.preventDefault();
//       $ctrl.error = "Show Error";
//       $ctrl.errorText = error.statusText;
      
//     });
//     cancellers.push(cancel);
//   };

//   $ctrl.$onDestroy = function () {
//     cancellers.forEach(function (item) {
//       item();
//     });
//   };

// };



})();
