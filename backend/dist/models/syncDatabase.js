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
const database_1 = __importDefault(require("../utils/database")); // Import your database connection
function syncDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Synchronize all models to ensure the database schema is updated
            yield database_1.default.sync({ alter: true }); // Use 'alter' to update without dropping tables
            console.log('All database tables synced successfully.');
        }
        catch (error) {
            console.error('Error syncing database:', error);
        }
        finally {
            // Close the database connection after syncing
            yield database_1.default.close();
            console.log('Database connection closed.');
        }
    });
}
// Run the sync function
syncDatabase();
