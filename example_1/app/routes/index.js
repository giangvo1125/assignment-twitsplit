//include npm module
var _ = require('lodash')
//define child routes
var uiRoute = require('./ui')

module.exports = function(app) {
	var routes = {}
	_.extend(routes, uiRoute(app))
	return routes
}
