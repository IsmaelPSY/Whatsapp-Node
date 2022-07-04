const config = require('../../config')
module.exports = {
    "development": {
        "username": config.db.development.username,
        "password": config.db.development.password,
        "database": config.db.development.database,
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    "test": {
        "username": "root",
        "password": null,
        "database": "database_test",
        "host": "127.0.0.1",
        "dialect": "postgres"
    },
    production: {
        url: config.db.production.url,
        use_env_variable: config.db.production.url,
        dialect: 'postgres',
        protocol: 'postgres',
        ssl: true,
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
    },
}