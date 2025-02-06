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
// CORS configuration
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000', // Replace '*' with your frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));
// Middleware to parse JSON requests
app.use(body_parser_1.default.json());
// Debug Middleware (Optional)
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (Object.keys(req.body).length) {
        console.log('Request Body:', req.body);
    }
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
// Handle preflight CORS requests (optional, usually Express handles it automatically)
app.options('*', (0, cors_1.default)());
exports.default = app;
