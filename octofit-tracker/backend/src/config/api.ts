const getPort = () => process.env.PORT || '8000';

export const getApiBaseUrl = () => {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-${getPort()}.app.github.dev`;
  }

  return `http://localhost:${getPort()}`;
};

export const getApiUrl = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};
