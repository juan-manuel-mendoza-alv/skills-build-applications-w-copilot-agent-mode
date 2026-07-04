const getPort = () => import.meta.env?.VITE_API_PORT || '8000';

const getCodespaceNameFromHost = (host = '') => {
  const match = host.match(/^([a-z0-9-]+)-\d+\.app\.github\.dev$/i);
  return match?.[1] || '';
};

export const getCodespaceName = () => {
  const envName = import.meta.env?.VITE_CODESPACE_NAME?.trim();

  if (envName) {
    return envName;
  }

  if (typeof window !== 'undefined') {
    return getCodespaceNameFromHost(window.location.hostname);
  }

  return '';
};

export const getApiBaseUrl = () => {
  if (typeof window !== 'undefined') {
    const hostName = window.location.hostname;
    const port = window.location.port;

    if (hostName.includes('.app.github.dev')) {
      if (port === '5173') {
        const codespaceName = getCodespaceName();

        if (codespaceName) {
          return `https://${codespaceName}-${getPort()}.app.github.dev`;
        }
      }

      if (port === getPort()) {
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

