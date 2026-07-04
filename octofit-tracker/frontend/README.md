# OctoFit Tracker frontend

This React 19 presentation tier uses Vite and React Router to display data from the OctoFit backend.

## Environment configuration

The frontend uses Vite environment variables from import.meta.env. For GitHub Codespaces, define VITE_CODESPACE_NAME in a local environment file such as .env.local:

```bash
cp .env.local.example .env.local
```

Example:

```env
VITE_CODESPACE_NAME=your-codespace-name
```

If VITE_CODESPACE_NAME is not set, the app falls back to http://localhost:8000 for local development.
