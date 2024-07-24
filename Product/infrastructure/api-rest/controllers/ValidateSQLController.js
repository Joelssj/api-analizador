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
exports.ValidateSQLController = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
let connection = null;
// Función para validar el nombre de la base de datos
function validateDatabaseName(dbName) {
    return /^[A-Za-z]+$/.test(dbName);
}
class ValidateSQLController {
    checkConnection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { host, user, password, database } = req.body;
            if (!host || !user || !password || !database) {
                return res.status(400).json({ success: false, message: 'Database connection details are missing.' });
            }
            if (!validateDatabaseName(database)) {
                return res.status(400).json({
                    success: false,
                    message: 'Database name must contain only letters and no numbers.'
                });
            }
            try {
                connection = yield promise_1.default.createConnection({
                    host,
                    user,
                    password,
                    database,
                });
                return res.json({ success: true, message: 'Database connection successful.' });
            }
            catch (error) { // Asegúrate de que TypeScript reconozca la excepción como de tipo any
                connection = null;
                return res.status(500).json({
                    success: false,
                    message: 'Database connection failed.',
                    error: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Unknown error' // Uso seguro del error
                });
            }
        });
    }
    executeQuery(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const { query, table, id } = req.body;
            if (!query && (!table || !id)) {
                return res.status(400).json({ success: false, message: 'No SQL query or delete parameters provided.' });
            }
            if (!connection) {
                return res.status(400).json({ success: false, message: 'Database connection is not established.' });
            }
            // Verificar si es una solicitud de eliminación
            if (table && id) {
                const deleteQuery = `DELETE FROM \`${table}\` WHERE id = ?`;
                try {
                    const [results] = yield connection.execute(deleteQuery, [id]);
                    return res.json({ success: true, message: 'Record deleted successfully.', results });
                }
                catch (error) {
                    return res.status(500).json({
                        success: false,
                        message: 'Error deleting record.',
                        error: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Unknown error'
                    });
                }
            }
            if (!/;\s*$/.test(query)) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid SQL query format. Ensure it ends with a semicolon.'
                });
            }
            const createDatabaseRegex = /CREATE\s+DATABASE\s+([\w]+)\s*;/i;
            const match = createDatabaseRegex.exec(query);
            if (match && match[1] && !validateDatabaseName(match[1])) {
                return res.status(400).json({
                    success: false,
                    message: 'Database name in query must contain only letters and no numbers.'
                });
            }
            try {
                const [results] = yield connection.query(query);
                return res.json({ success: true, message: 'Query executed successfully.', results });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error executing SQL query.',
                    error: (_b = error === null || error === void 0 ? void 0 : error.message) !== null && _b !== void 0 ? _b : 'Unknown error'
                });
            }
        });
    }
    closeConnection(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!connection) {
                return res.status(400).json({ success: false, message: 'No database connection to close.' });
            }
            try {
                yield connection.end();
                connection = null;
                return res.json({ success: true, message: 'Database connection closed.' });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    message: 'Error closing the database connection.',
                    error: (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : 'Unknown error'
                });
            }
        });
    }
}
exports.ValidateSQLController = ValidateSQLController;
