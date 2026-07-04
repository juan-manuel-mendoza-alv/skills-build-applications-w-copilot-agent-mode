"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getApiUrl = exports.getApiBaseUrl = void 0;
const getPort = () => process.env.PORT || '8000';
const getApiBaseUrl = () => {
    const codespaceName = process.env.CODESPACE_NAME;
    if (codespaceName) {
        return `https://${codespaceName}-${getPort()}.app.github.dev`;
    }
    return `http://localhost:${getPort()}`;
};
exports.getApiBaseUrl = getApiBaseUrl;
const getApiUrl = (path = '/') => {
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${(0, exports.getApiBaseUrl)()}${normalizedPath}`;
};
exports.getApiUrl = getApiUrl;
