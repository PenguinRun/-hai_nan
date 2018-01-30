const config = require('./development_config');
const { Pool, Client } = require('pg')

const client = new Client({
    user: config.postgresql.name,
    host: config.postgresql.host,
    database: config.postgresql.database,
    password: config.postgresql.password,
})

client.connect(function(err) {
    if (!err) {
        console.log('psql successfully connected');
    } else {
        console.log(err);
    }
})

module.exports = client;