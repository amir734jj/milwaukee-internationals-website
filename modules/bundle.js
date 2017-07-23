var path = require('path');

module.exports = function(app, expressBundles) {
  app.use(expressBundles.middleware({
    env: app.get('env'),
    src: path.join(__dirname, 'assets'),
    bundles: {
      'bundle.css': [
        'css/bootstrap.css',
        'css/bootstrap-theme.css'
      ],
      'bundle.js': [
        'js/jquery.js',
        'js/bootstrap.js'
      ]
    }
  }));

  return this;
};
