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
  };


  $scope.getAllDriverMappingPDF = function() {
    $http.get("driver/list/json").then(function(response) {
      var driversBucket = response.data.driversBucket;

      var doc = new jsPDF({
        orientation: "l",
        lineHeight: 1.5
      });

      doc.setFont('courier');

      doc.setFontSize(11);

      var subsetAttr = function(attrList, obj) {
        return attrList.reduce(function(o, k) {
          o[k] = obj[k];
          return o;
        }, {});
      };


      driversBucket.map(function(driver, index) {
        var str = "Driver: " + driver.fullname + " ( available: " + (driver.totalSeats - driver.students.length) + " )" + "\n\n";

        str += stringTable.create(driver.students.map(function(student) {
          return subsetAttr(["fullname", "country", "email", "university", "major"], student);
        }));

        doc.text(20, 20, str);

        if (index + 1 < driversBucket.length) {
          doc.addPage();
        }

      });

      doc.save("student-list.pdf");

    });
  };

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
  };


  $scope.getAllHostMappingPDF = function() {
    $http.get("host/list/json").then(function(response) {
      var hostsBucket = response.data.hostsBucket;

      var doc = new jsPDF({
        orientation: "l",
        lineHeight: 1.5
      });

      doc.setFont('courier');

      doc.setFontSize(11);

      var subsetAttr = function(attrList, obj) {
        return attrList.reduce(function(o, k) {
          o[k] = obj[k];
          return o;
        }, {});
      };


      hostsBucket.map(function(host, index) {
        var str = "Host: " + host.fullname + " ( available: " + (host.maxGuests - host.drivers.length) + " )" + "\n\n";

        str += stringTable.create(host.drivers.map(function(driver) {
          return subsetAttr(["fullname", "email", "phone"], driver);
        }));

        doc.text(20, 20, str);

        if (index + 1 < hostsBucket.length) {
          doc.addPage();
        }

      });

      doc.save("student-list.pdf");

    });
  };


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
  $scope.countries = "All Countries";

  $scope.getAllStudents = function() {
    $http.get(window.location.pathname + "/students").then(function(response) {
      $scope.students = response.data;
      $scope.allStudents = response.data;
    });
  };

  $scope.changeAttendance = function(student) {
    $http.post(window.location.pathname + "/check-in", {
      studentId: student.studentId,
      attendance: !student.attendance
    }).then(function() {
      $scope.attendance = !$scope.attendance;
      $scope.updateTable();
    });
  };

  $scope.getStudentCountries = function() {
    $http.get(window.location.pathname + "/get-student-countries").then(function(response) {
      $scope.countries = ["All Countries"];
      $scope.countries = $scope.countries.concat(response.data);
      $scope.country = $scope.countries[0]
    });
  };

  $scope.updateTable = function() {

    var students = $scope.allStudents;
    var retVal_country = [];
    var retVal_attendance = [];
    var retVal_fullname = [];
    var retVal = [];


    if ($scope.country === "All Countries") {
      retVal_country = students;
    } else {
      for (var i = 0; i < students.length; i++) {
        var student = students[i];

        if (student.country === $scope.country) {
          retVal_country.push(student);
        }
      }
    }
    students = retVal_country;




    if ($scope.attendanceFilter === "all") {
      retVal_attendance = students;
    } else {
      for (var i = 0; i < students.length; i++) {
        var student = students[i];

        if ((student.attendance && $scope.attendanceFilter === "yes") || (!student.attendance && $scope.attendanceFilter === "no")) {
          retVal_attendance.push(student);
        }
      }
    }
    students = retVal_attendance;


    if (!$scope.fullname) {
      retVal_fullname = students;
    } else {
      for (var i = 0; i < students.length; i++) {
        var student = students[i];

        if (student.fullname.toLowerCase().indexOf($scope.fullname.toLowerCase()) > -1) {
          retVal_fullname.push(student);
        }
      }
    }
    students = retVal_fullname;


    $scope.students = students;

  };

  $scope.countries = [];
  $scope.attendanceFilter = "all";
  $scope.fullname = "";

  $scope.getStudentCountries();

  $scope.getAllStudents();
}]);

app.controller("studentListCtrl", ["$scope", "$http", function($scope, $http) {
  $scope.getAllStudentsPDF = function() {
    $http.get("list/json").then(function(response) {
      var students = response.data;

      var doc = new jsPDF({
        orientation: "l",
        lineHeight: 1.5
      });

      doc.setFont('courier');

      doc.setFontSize(11);

      var subsetAttr = function(attrList, obj) {
        return attrList.reduce(function(o, k) {
          o[k] = obj[k];
          return o;
        }, {});
      };

      var i, j, temparray, chunk = 25;
      for (i = 0, j = students.length; i < j; i += chunk) {
        temparray = students.slice(i, i + chunk);

        var str = stringTable.create(temparray.map(function(student) {
          return subsetAttr(["fullname", "country", "email", "university", "major", "attendance"], student);
        }));

        doc.text(20, 20, str);

        if (i + chunk < j) {
          doc.addPage();
        }
      }

      doc.save("student-list.pdf");

    });
  };
}])
