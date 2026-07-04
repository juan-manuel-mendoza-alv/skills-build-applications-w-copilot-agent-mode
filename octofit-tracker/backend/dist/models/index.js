"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    fitnessLevel: { type: String, required: true },
    goals: [{ type: String }],
    team: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Team' },
}, { timestamps: true });
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    captain: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    city: { type: String, required: true },
}, { timestamps: true });
const activitySchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
}, { timestamps: true });
const leaderboardSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    streak: { type: Number, default: 0 },
}, { timestamps: true });
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    equipment: [{ type: String }],
    focus: [{ type: String }],
}, { timestamps: true });
exports.User = (0, mongoose_1.model)('User', userSchema);
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
exports.LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', leaderboardSchema);
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
