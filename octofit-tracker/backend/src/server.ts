import express from 'express';
import './config/database';
import { Activity, LeaderboardEntry, Team, User, Workout } from './models';

const getPort = () => process.env.PORT || '8000';

const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-${getPort()}.app.github.dev`;
  }

  return `http://localhost:${getPort()}`;
};

const getApiUrl = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};

const app = express();
const port = Number(process.env.PORT || 8000);
const host = process.env.HOST || '0.0.0.0';

app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend', apiBaseUrl: getApiBaseUrl() });
});

const registerCollectionRoute = async (path: string, handler: () => Promise<unknown>, method: 'get' | 'post' = 'get') => {
  if (method === 'get') {
    app.get(path, async (_req, res) => {
      try {
        const data = await handler();
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });

    app.get(`${path}/`, async (_req, res) => {
      try {
        const data = await handler();
        res.json(data);
      } catch (error) {
        res.status(500).json({ error: (error as Error).message });
      }
    });
    return;
  }

  app.post(path, async (_req, res) => {
    try {
      const data = await handler();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });

  app.post(`${path}/`, async (_req, res) => {
    try {
      const data = await handler();
      res.status(201).json(data);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  });
};

registerCollectionRoute('/api/users', () => User.find().populate('team').lean());
registerCollectionRoute('/api/teams', () => Team.find().populate('captain').populate('members').lean());
registerCollectionRoute('/api/activities', () => Activity.find().populate('user').lean());
registerCollectionRoute('/api/leaderboard', () => LeaderboardEntry.find().populate('user').lean());
registerCollectionRoute('/api/workouts', () => Workout.find().lean());

app.listen(port, host, () => {
  console.log(`OctoFit backend listening on ${host}:${port}`);
  console.log(`API base URL: ${getApiBaseUrl()}`);
});
