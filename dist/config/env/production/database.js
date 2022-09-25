"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_connection_string_1 = require("pg-connection-string");
const config = (0, pg_connection_string_1.parse)(process.env.DATABASE_URL);
exports.default = ({ env }) => ({
    connection: {
        client: "postgres",
        connection: {
            host: config.host,
            port: config.port,
            database: config.database,
            user: config.user,
            password: config.password,
            ssl: {
                rejectUnauthorized: false,
            },
        },
        debug: false,
    },
});
