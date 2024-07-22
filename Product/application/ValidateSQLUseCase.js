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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidateSQLUseCase = void 0;
const aurora_1 = require("../../database/aurora");
class ValidateSQLUseCase {
    constructor(sqlValidator) {
        this.sqlValidator = sqlValidator;
    }
    validate(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.sqlValidator.validate(queryString);
        });
    }
    execute(queryString) {
        return __awaiter(this, void 0, void 0, function* () {
            // Ejecutar la consulta directamente
            const result = yield (0, aurora_1.query)(queryString);
            return result;
        });
    }
}
exports.ValidateSQLUseCase = ValidateSQLUseCase;
