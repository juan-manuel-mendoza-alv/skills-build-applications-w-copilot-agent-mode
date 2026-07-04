import express from 'express';
import './config/database';
import { getApiBaseUrl } from './config/api';

const app = express();
const port = Number(process.env.PORT || 8000);

const resourceEndpoints = [
  '/api/users',
  '/api/teams',
  '/api/activities',
  '/api/leaderboard',
  '/api/workouts',
];

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: getApiBaseUrl() });
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
  console.log(`API base URL: ${getApiBaseUrl()}`);
});
