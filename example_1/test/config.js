var chai = require('chai')
var jsdom = require('jsdom')
var fs = require('fs-extra')
var vm = require('vm');

chai.use(require('chai-dom'))
global.view = new jsdom.JSDOM('<html><head></head><body><div class="form" id="form-test"></div></body></html>')
global.window = view.window
global.document = view.window.document
global.expect = chai.expect
global.chai = chai

var HelperCode = fs.readFileSync('assets/js/helper.js', 'utf8')
vm.runInThisContext(HelperCode)
var FormBuildCode = fs.readFileSync('assets/js/form.js', 'utf8')
vm.runInThisContext(FormBuildCode)

global.form = new FormBuild({id: 'form-test'})
global.form.init()
global.helper = new Helper()

