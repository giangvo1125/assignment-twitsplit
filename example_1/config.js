var config = {
    development: {
        port: 2023, 
    },  
}
const env = process.env.NODE_ENV || 'development'

module.exports = config[env]
