//Sets up angular.js app
var app = angular.module('claimsPanel', []);
//This service is used to retrieve data from the database using
app.service("vendorService", function ($http, $q)
{
  this.getAllVendors = function ()
  {
    var deferred = $q.defer();
    $http.get("api/vendor")
      .success( function( data ) {
          deferred.resolve(data);
      })
      .error(function(err, status) {
          deferred.reject(err);
      });

    return deferred.promise;
  }
});
//This service is used to retrieve the config file
app.service("configService", function ($http, $q)
{
  this.getConfig = function ()
  {
    var deferred = $q.defer();
    $http.get("api/config")
      .success( function( data ) {
          deferred.resolve(data);
      })
      .error(function(err, status) {
          deferred.reject(err);
      });

    return deferred.promise;
  }
});
//Controller that controls the table
app.controller('vendorTableController', function($scope, vendorService, configService) {
  $scope.vendors = [];
  var config = null;
  configService.getConfig().then( function (data) {
    config = data;
  });
  var promise = vendorService.getAllVendors();

  promise.then(function (data) {

    var vendorTable = $('#vendorTable').DataTable( {
      fixedHeader: true,
      "pagingType": "simple",
      data: data,
      columns: [
        { data: 'id'},
        { data: 'name' },
        { data: 'vendorType' },
        { data: 'stateRepresented' },
        { data: 'department' },
        { data: 'firmName', "defaultContent": "No Firm"},
      ]
    });

    $("tbody tr").click(function() {
      var id = $(this).find('td').eq(0).text();
      console.log(id);
      var host = config.web.host;
      var port = config.web.port;
      window.location.replace("http://"+host+':'+port+'/api/vendor/1');
    });
    
    $scope.vendors = data;
  });

});
//Controller that controls the new form
app.controller('newVendorController', function($scope, configService) {
  $scope.enums = [];

  var promise = configService.getConfig();

  promise.then(function (data) {
    $scope.enums = data.enums;
    $scope.rates = [];
    $scope.states = data.enums.states;
    //Remove National from enum
    var index = $scope.states.indexOf('National');
    if (index > -1) {
        $scope.states.splice(index, 1);
    }
    //JQuery functionality for form
    $('#stateRepresented').select2({
      placeholder: "Select a state",
      allowClear: true,
      data: $scope.states
    });
    $('#state').select2({
      placeholder: "Select a state",
      allowClear: true,
      data: $scope.states
    });
    $('#defense').select2({
      data: data.enums.defenses,
      placeholder: 'Select the types of defense',
      allowClear: true
    });
    $('#department').select2({
      placeholder: "Select a department",
      allowClear: true,
      data: data.enums.departments
    });
    $('#status').select2({
      placeholder: "Select a status",
      allowClear: true,
      data: data.enums.statuses
    });
    //Add rates row
    $('#addButton').click( function(){
      var rate = 0;
      if($scope.rates.length){
        var last = $scope.rates[$scope.rates.length-1];
        last++;
        $scope.rates.push(last);
        rate = last;
      } else {
        $scope.rates.push(0);
      }
      $scope.$apply();
      //Add JQuery functionality to new row
      $('#rateDefense' + rate).select2({
        data: data.enums.defenses,
        placeholder: 'Select the type of defense'
      });
      $('#rateType' + rate).select2({
        data: data.enums.rateTypes,
        placeholder: 'Select the type of Rate'
      });
      $('#date' + rate).datepicker();
    });
    //Remove rates row
    $('#removeButton').click( function() {
      if($scope.rates.length){
        var index = $scope.rates.length-1;
        $scope.rates.splice(index,1);
      }
      $scope.$apply();
    })
  });
});
//Controller that controls the new form
app.controller('updateController', function($scope, configService) {
  $scope.enums = [];

  var promise = configService.getConfig();

  promise.then(function (data) {
    $scope.enums = data.enums;
    $scope.rates = [];
    $scope.states = data.enums.states;
    //remove National from enum
    var index = $scope.states.indexOf('National');
    if (index > -1) {
        $scope.states.splice(index, 1);
    }
    //JQuery functionality for form
    $('#stateRepresented').select2({
      placeholder: "Select a state",
      allowClear: true,
      data: $scope.states
    });
    $('#state').select2({
      placeholder: "Select a state",
      allowClear: true,
      data: $scope.states
    });
    $('#defense').select2({
      data: data.enums.defenses,
      placeholder: 'Select the types of defense',
      allowClear: true
    });
    $('#department').select2({
      placeholder: "Select a department",
      allowClear: true,
      data: data.enums.departments
    });
    $('#status').select2({
      placeholder: "Select a status",
      allowClear: true,
      data: data.enums.statuses
    });
    //Add rates row
    $('#addButton').click( function(){
      var rate = 0;
      if($scope.rates.length){
        var last = $scope.rates[$scope.rates.length-1];
        last++;
        $scope.rates.push(last);
        rate = last;
      } else {
        $scope.rates.push(0);
      }
      $scope.$apply();
      //Add functionality to new row
      $('#rateDefense' + rate).select2({
        data: data.enums.defenses,
        placeholder: 'Select the type of defense'
      });
      $('#rateType' + rate).select2({
        data: data.enums.rateTypes,
        placeholder: 'Select the type of Rate'
      });
      $('#date' + rate).datepicker();
    });
    //Remove rates row
    $('#removeButton').click( function() {
      if($scope.rates.length){
        var index = $scope.rates.length-1;
        $scope.rates.splice(index,1);
      }
      $scope.$apply();
    });
  });
});