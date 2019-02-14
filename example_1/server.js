//include npm module
var http = require('http')
var express = require('express')
var path = require('path')
//include config variable
var config = require('./config')

const app = express()

// Require our routes into the application.
require('./app/routes')(app)

app.use(express.static(__dirname + '/assets'))

app.get('/favicon.ico', (req, res) => res.status(204))
app.set('views', __dirname + '/views')
app.engine('html', require('ejs').renderFile);

app.set('port', config.port)

const server = http.createServer(app)
server.listen(config.port, () => {
	console.log('Ready on port %d', server.address().port)
})