var path = require('path');

module.exports = function(app, expressBundles) {
  app.use(expressBundles.middleware({
    env: app.get('env'),
    src: path.join(__dirname, 'assets'),
    bundles: {
      'bundle.css': [
        'css/bootstrap.css',
        'css/bootstrap-theme.css',
        'css/style.css'
      ],
      'bundle.js': [
        'js/jquery.js',
        'js/bootstrap.js',
        'js/angular.js',
        'js/script.js'
      ]
    }
  }));

  return this;
};
