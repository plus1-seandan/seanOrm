"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const connectDB = () => {
    const { Pool, Client } = require("pg");
    const pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "CustomOrm",
        password: "shjsds04",
        port: 5432,
    });
    pool.query("SELECT NOW()", (err, res) => {
        console.log(err, res);
        pool.end();
    });
    const client = new Client({
        user: "postgres",
        host: "localhost",
        database: "CustomOrm",
        password: "shjsds04",
        port: 5432,
    });
    client.connect();
    client.query("SELECT NOW()", (err, res) => {
        console.log(err, res);
        client.end();
    });
};
exports.connectDB = connectDB;
//# sourceMappingURL=connectDB.js.map