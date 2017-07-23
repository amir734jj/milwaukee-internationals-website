var _ = require('underscore');

var isLoggedIn = function(req) {
  return _.isNull(req.session.user);
};

module.exports = function(req, loggedInCallback, loggedOutCallback) {
  if (isLoggedIn(req) && _.isFunction(loggedInCallback)) {
    loggedInCallback();
  } else if (_.isFunction(loggedOutCallback)) {
    loggedOutCallback();
  }
};
