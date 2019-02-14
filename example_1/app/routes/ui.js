let { 
	renderBaseView
} = require('../controllers/UIController')

module.exports = (app) => {
    app.get('/', renderBaseView)
}