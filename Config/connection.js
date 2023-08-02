const { connect, connection } = require('mongoose');

connect('mongodb:127.0.00:27017/socialnetwork_db');

module.exports = connection;