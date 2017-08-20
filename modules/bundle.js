var path = require('path');

module.exports = function(app, expressBundles) {
  var token = "";

  if (app.get('env') === "production") {
    token = "min.";
  }

  var process = (path) => {
    var extension = path.match(/[^.]+$/g)[0];
    var str = path.replace(new RegExp(extension + "$"), token + extension);
    return str;
  };

  app.use(expressBundles.middleware({
    env: "development",
    /*app.get('env'), */
    src: path.join(__dirname, 'assets'),
    bundles: {
      'bundle.css': ([
        'css/bootstrap.css',
        'css/bootstrap-theme.css',
        'css/bootstrap-xlgrid.css',
        'css/ng-tags-input.css',
        'css/ng-tags-input.bootstrap.css',
        'css/select2.css',
        'css/angular-bootstrap-toggle.css',
        'css/tablesort.css',
        'css/bootstrap-table.css'
      ]).map(process).concat([
        'css/style.css'
      ]),
      'bundle.js': ([
        'js/jquery.js',
        'js/bootstrap.js',
        'js/angular.js',
        'js/ng-tags-input.js',
        'js/select2.js',
        'js/jquery.validate.js',
        'js/jspdf.js',
        'js/stringTable.js',
        'js/angular-bootstrap-toggle.js',
        'js/angular-tablesort.js',
        'js/bootstrap-table.js'
      ]).map(process).concat([
        'js/script.js'
      ])
    }
  }));

  return this;
};
