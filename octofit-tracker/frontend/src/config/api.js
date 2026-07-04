const getPort = () => import.meta.env.VITE_API_PORT || '8000';

export const getApiBaseUrl = () => {
  // In Codespaces, the frontend runs on https://{CODESPACE_NAME}-5173.app.github.dev
  // We need to construct the API URL by replacing 5173 with the API port
  const currentHost = window.location.hostname;
  
  // Check if we're in a Codespaces environment (*.app.github.dev domain)
  if (currentHost.includes('.app.github.dev')) {
    // Extract the codespace name by removing the port suffix (-5173)
    const codespaceName = currentHost.replace(/-5173\.app\.github\.dev$/, '');
    return `https://${codespaceName}-${getPort()}.app.github.dev`;
  }

  // Fall back to localhost
  return `http://localhost:${getPort()}`;
};

export const getApiUrl = (path = '/') => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
};

