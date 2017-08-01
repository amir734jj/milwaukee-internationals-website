var app = angular.module("myApp", ["ngTagsInput"]);

app.controller("driverMappingCtrl", ["$scope", "$http", "$window", function($scope, $http, $window) {

  $scope.updateData = function() {
    $http.get(window.location.pathname + "/list/json").then(function(response) {
      var data = response.data;
      $scope.driversBucket = data.driversBucket;
      $scope.studentsBucket = data.studentsBucket;
      $scope.allAvailableDrivers = data.allDrivers;
    });
  };

  $scope.addMap = function(studentId, driverId) {
    $scope.changeMap(studentId, driverId, "add");
  };

  $scope.deleteMap = function(studentId, driverId) {
    $scope.changeMap(studentId, driverId, "delete");
  };

  $scope.changeMap = function(studentId, driverId, action) {
    if (driverId && studentId) {
      $http.post(window.location.pathname + "/" + action, {
        "driverId": driverId,
        "studentId": studentId
      }).then(function() {
        $scope.updateData();
      });
    };
  }

  $scope.updateData();

}]);


app.controller("hostMappingCtrl", ["$scope", "$http", "$window", function($scope, $http, $window) {

  $scope.updateData = function() {
    $http.get(window.location.pathname + "/list/json").then(function(response) {
      var data = response.data;
      $scope.driversBucket = data.driversBucket;
      $scope.hostsBucket = data.hostsBucket;
      $scope.allAvailableHosts = data.allAvailableHosts;
    });
  };

  $scope.addMap = function(driverId, hostId) {
    $scope.changeMap(driverId, hostId, "add");
  };

  $scope.deleteMap = function(driverId, hostId) {
    $scope.changeMap(driverId, hostId, "delete");
  };

  $scope.changeMap = function(driverId, hostId, action) {
    if (driverId && hostId) {
      $http.post(window.location.pathname + "/" + action, {
        "driverId": driverId,
        "hostId": hostId
      }).then(function() {
        $scope.updateData();
      });
    };
  }

  $scope.updateData();

}]);

app.directive("jqPluginsDirective", ["$timeout", function($timeout) {
  return {
    scope: false, // use parent scope, directive should not create a scope for itself
    link: function(scope, elem, attr) {
      $timeout(function() {
        $("select").select2();
        $("form").validate();
      });
    }
  };
}]);

app.controller("checkInCtrl", ["$scope", "$http", function($scope, $http) {

  $scope.getAllStudents = function() {
    $http.get(window.location.pathname + "/students").then(function(response) {
      $scope.students = response.data;
      $scope.allStudents = response.data;
      $scope.updateTableByCountry($scope.country);
      $scope.updateTableByFullname($scope.fullname);
    });
  };

  $scope.changeAttendance = function(student) {
    $http.post(window.location.pathname + "/check-in", {
      studentId: student.studentId,
      attendance: student.attendance
    }).then(function() {
      $scope.getAllStudents();
    });
  };

  $scope.getStudentCountries = function() {
    $http.get(window.location.pathname + "/get-student-countries").then(function(response) {
      $scope.countries = response.data;
      $scope.countries.push("All countries");
    });
  };

  $scope.updateTableByCountry = function(country) {
    if (country === "All countries") {
      $scope.students = $scope.allStudents;
    } else {
      $scope.students = $scope.allStudents.filter(function(student) {
        return student.country === country;
      });
    }
  };

  $scope.updateTableByFullname = function(fullname) {
    if (fullname) {
      $scope.students = $scope.allStudents.filter(function(student) {
        return student.fullname.toLowerCase().indexOf(fullname.toLowerCase()) > -1;
      });
    } else {
      $scope.students = $scope.allStudents;
    }
  };

  $scope.getStudentCountries();

  $scope.getAllStudents();
}]);
