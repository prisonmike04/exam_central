"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const supervisorRoutes_1 = __importDefault(require("./routes/supervisorRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({ origin: 'http://localhost:3000' })); // Enable CORS for frontend URL
app.use(body_parser_1.default.json());
// Routes
app.use('/api/supervisors', supervisorRoutes_1.default);
// Health check route
app.get('/', (req, res) => {
    res.send('Backend is running...');
});
exports.default = app;
