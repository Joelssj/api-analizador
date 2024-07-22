"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuroraSQLValidator = void 0;
const sql_parser_1 = __importDefault(require("sql-parser"));
class AuroraSQLValidator {
    validate(query) {
        try {
            // Remover el punto y coma antes de la validación
            const cleanedQuery = query.trim().replace(/;$/, '');
            sql_parser_1.default.parse(cleanedQuery); // Asumiendo que esta función valida la consulta
            return { isValid: true };
        }
        catch (error) {
            let errorMessage;
            if (error instanceof Error) {
                errorMessage = error.message;
            }
            else {
                errorMessage = 'Unknown error';
            }
            return { isValid: false, errors: [errorMessage] };
        }
    }
}
exports.AuroraSQLValidator = AuroraSQLValidator;
