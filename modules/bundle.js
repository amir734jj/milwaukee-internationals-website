var path = require('path');

module.exports = function(app, expressBundles) {
  app.use(expressBundles.middleware({
    env: "development",
    /*app.get('env'), */
    src: path.join(__dirname, 'assets'),
    bundles: {
      'bundle.css': [
        'css/bootstrap.css',
        'css/bootstrap-theme.css',
        'css/ng-tags-input.css',
        'css/ng-tags-input.bootstrap.css',
        'css/select.css',
        'css/style.css'
      ],
      'bundle.js': [
        'js/jquery.js',
        'js/bootstrap.js',
        'js/angular.js',
        'js/ng-tags-input.js',
        'js/select.js',
        'js/angular-drag-and-drop-lists.js',
        'js/script.js'
      ]
    }
  }));

  return this;
};
