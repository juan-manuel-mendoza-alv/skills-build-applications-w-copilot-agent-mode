"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const api_1 = require("./config/api");
const models_1 = require("./models");
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: (0, api_1.getApiBaseUrl)() });
});
const registerCollectionRoute = async (path, handler, method = 'get') => {
    if (method === 'get') {
        app.get(path, async (_req, res) => {
            try {
                const data = await handler();
                res.json(data);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        app.get(`${path}/`, async (_req, res) => {
            try {
                const data = await handler();
                res.json(data);
            }
            catch (error) {
                res.status(500).json({ error: error.message });
            }
        });
        return;
    }
    app.post(path, async (_req, res) => {
        try {
            const data = await handler();
            res.status(201).json(data);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
    app.post(`${path}/`, async (_req, res) => {
        try {
            const data = await handler();
            res.status(201).json(data);
        }
        catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
};
registerCollectionRoute('/api/users', () => models_1.User.find().populate('team').lean());
registerCollectionRoute('/api/teams', () => models_1.Team.find().populate('captain').populate('members').lean());
registerCollectionRoute('/api/activities', () => models_1.Activity.find().populate('user').lean());
registerCollectionRoute('/api/leaderboard', () => models_1.LeaderboardEntry.find().populate('user').lean());
registerCollectionRoute('/api/workouts', () => models_1.Workout.find().lean());
app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
    console.log(`API base URL: ${(0, api_1.getApiBaseUrl)()}`);
});
