"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const supervisorRoutes_1 = __importDefault(require("./routes/supervisorRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware for CORS and JSON parsing
app.use((0, cors_1.default)({
    origin: '*', // Allow all origins (use specific origin in production)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(body_parser_1.default.json());
// Debug Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    console.log('Request Body:', req.body);
    next();
});
// Routes
app.use('/api/supervisors', supervisorRoutes_1.default);
// Health Check Route
app.get('/', (req, res) => {
    res.send('Backend is running...');
});
// Catch-all Middleware for Undefined Routes
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        message: `Cannot ${req.method} ${req.originalUrl}`,
    });
});
exports.default = app;
