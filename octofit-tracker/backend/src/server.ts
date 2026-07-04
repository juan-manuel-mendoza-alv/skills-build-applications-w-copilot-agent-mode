import express from 'express';
import './config/database';

const app = express();
const port = Number(process.env.PORT || 8000);

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.listen(port, () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
