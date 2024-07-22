"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = query;
const promise_1 = __importDefault(require("mysql2/promise"));
const signale_1 = require("signale");
const signale = new signale_1.Signale();
const pool = promise_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 10,
});
function query(sql_1) {
    return __awaiter(this, arguments, void 0, function* (sql, params = []) {
        let conn;
        try {
            conn = yield pool.getConnection();
            console.log("SQL Query:", sql);
            const [results] = yield conn.execute(sql, params);
            return results;
        }
        catch (error) {
            signale.error("Error executing query:", error);
            throw error; // Rethrow after logging
        }
        finally {
            if (conn) {
                conn.release();
            }
        }
    });
}
