"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const api_1 = require("./config/api");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const resourceEndpoints = [
    '/api/users',
    '/api/teams',
    '/api/activities',
    '/api/leaderboard',
    '/api/workouts',
];
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: (0, api_1.getApiBaseUrl)() });
});
resourceEndpoints.forEach((endpoint) => {
    app.get(endpoint, (_req, res) => {
        res.json({ route: endpoint, message: `${endpoint} endpoint is ready` });
    });
    app.get(`${endpoint}/`, (_req, res) => {
        res.json({ route: `${endpoint}/`, message: `${endpoint}/ endpoint is ready` });
    });
    app.post(endpoint, (_req, res) => {
        res.status(201).json({ route: endpoint, message: `${endpoint} endpoint is ready` });
    });
    app.post(`${endpoint}/`, (_req, res) => {
        res.status(201).json({ route: `${endpoint}/`, message: `${endpoint}/ endpoint is ready` });
    });
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
    console.log(`API base URL: ${(0, api_1.getApiBaseUrl)()}`);
});
