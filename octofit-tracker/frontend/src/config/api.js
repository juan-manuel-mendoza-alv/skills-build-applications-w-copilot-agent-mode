const getPort = () => import.meta.env.VITE_API_PORT || '8000';

const getCodespaceNameFromHost = (host = '') => {
  const match = host.match(/^([a-z0-9-]+)-\d+\.app\.github\.dev$/i);
  return match?.[1] || '';
};

export const getCodespaceName = () => {
  const envName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  if (envName) {
    return envName;
  }

  if (typeof window !== 'undefined') {
    const hostName = window.location.hostname;
    const derived = getCodespaceNameFromHost(hostName);

    if (derived) {
      return derived;
    }

    return window.__OCTOFIT_CODESPACE_NAME || '';
  }

  return '';
};

export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const host = window.location.hostname;

    if (host.includes('.app.github.dev')) {
      const currentPort = window.location.port || getPort();

      if (currentPort === '5173') {
        return `https://${host.replace(/-5173/, `-${getPort()}`)}`;
      }

      if (currentPort === getPort()) {
        return `${window.location.protocol}//${window.location.host}`;
      }
    }
  }

  const codespaceName = getCodespaceName();

  if (codespaceName) {
    return `https://${codespaceName}-${getPort()}.app.github.dev`;
  }

  return `http://localhost:${getPort()}`;
};

export const getApiUrl = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};

