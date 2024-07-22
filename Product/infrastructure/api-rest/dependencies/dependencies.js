"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSQLController = exports.validateSQLUseCase = exports.sqlValidator = void 0;
const ValidateSQLUseCase_1 = require("../../../application/ValidateSQLUseCase");
const AuroraSQLValidator_1 = require("../../adapters/AuroraSQLValidator");
const ValidateSQLController_1 = require("../controllers/ValidateSQLController");
exports.sqlValidator = new AuroraSQLValidator_1.AuroraSQLValidator();
exports.validateSQLUseCase = new ValidateSQLUseCase_1.ValidateSQLUseCase(exports.sqlValidator);
exports.validateSQLController = new ValidateSQLController_1.ValidateSQLController();
