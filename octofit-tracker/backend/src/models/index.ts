import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    age: { type: Number, required: true },
    fitnessLevel: { type: String, required: true },
    goals: [{ type: String }],
    team: { type: Schema.Types.ObjectId, ref: 'Team' },
  },
  { timestamps: true }
);

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    captain: { type: Schema.Types.ObjectId, ref: 'User' },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    city: { type: String, required: true },
  },
  { timestamps: true }
);

const activitySchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    distanceKm: { type: Number, default: 0 },
    calories: { type: Number, default: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    rank: { type: Number, required: true },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
    equipment: [{ type: String }],
    focus: [{ type: String }],
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
export const Team = model('Team', teamSchema);
export const Activity = model('Activity', activitySchema);
export const LeaderboardEntry = model('LeaderboardEntry', leaderboardSchema);
export const Workout = model('Workout', workoutSchema);
