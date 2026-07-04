"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await mongoose_1.default.connection.dropDatabase().catch(() => undefined);
        const teamA = await models_1.Team.create({
            name: 'Phoenix Runners',
            sport: 'Running',
            city: 'Seattle',
        });
        const teamB = await models_1.Team.create({
            name: 'Summit Cyclists',
            sport: 'Cycling',
            city: 'Denver',
        });
        const users = await models_1.User.insertMany([
            {
                name: 'Maya Chen',
                email: 'maya@example.com',
                username: 'maya',
                age: 29,
                fitnessLevel: 'intermediate',
                goals: ['run a 10k', 'improve mobility'],
                team: teamA._id,
            },
            {
                name: 'Luis Ortega',
                email: 'luis@example.com',
                username: 'luis',
                age: 34,
                fitnessLevel: 'advanced',
                goals: ['train for a triathlon', 'build endurance'],
                team: teamB._id,
            },
            {
                name: 'Ava Patel',
                email: 'ava@example.com',
                username: 'ava',
                age: 27,
                fitnessLevel: 'beginner',
                goals: ['lose weight', 'stay consistent'],
                team: teamA._id,
            },
        ]);
        await models_1.Team.findByIdAndUpdate(teamA._id, { captain: users[0]._id, members: [users[0]._id, users[2]._id] });
        await models_1.Team.findByIdAndUpdate(teamB._id, { captain: users[1]._id, members: [users[1]._id] });
        await models_1.Activity.insertMany([
            {
                user: users[0]._id,
                type: 'Run',
                durationMinutes: 45,
                distanceKm: 7.5,
                calories: 480,
            },
            {
                user: users[1]._id,
                type: 'Ride',
                durationMinutes: 60,
                distanceKm: 20,
                calories: 620,
            },
            {
                user: users[2]._id,
                type: 'Walk',
                durationMinutes: 30,
                distanceKm: 3.2,
                calories: 180,
            },
        ]);
        await models_1.LeaderboardEntry.insertMany([
            { user: users[0]._id, score: 1840, rank: 1, streak: 5 },
            { user: users[1]._id, score: 1760, rank: 2, streak: 3 },
            { user: users[2]._id, score: 1420, rank: 3, streak: 2 },
        ]);
        await models_1.Workout.insertMany([
            {
                title: 'Tempo Run',
                category: 'Cardio',
                durationMinutes: 35,
                difficulty: 'Intermediate',
                equipment: ['Shoes'],
                focus: ['Endurance', 'Speed'],
            },
            {
                title: 'Hill Climb',
                category: 'Cycling',
                durationMinutes: 50,
                difficulty: 'Advanced',
                equipment: ['Bike', 'Helmet'],
                focus: ['Power', 'Stamina'],
            },
            {
                title: 'Core Flow',
                category: 'Mobility',
                durationMinutes: 20,
                difficulty: 'Beginner',
                equipment: ['Yoga Mat'],
                focus: ['Balance', 'Recovery'],
            },
        ]);
        console.log('Seed the octofit_db database with test data');
        console.log('Database seeding complete');
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
