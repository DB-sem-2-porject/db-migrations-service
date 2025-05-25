
export class AuthServiceInfo {
  static readonly AUTH_SERVICE = 'auth';
  static readonly AUTH_SERVICE_PORT = 1338;
  static readonly AUTH_SERVICE_URL = `http://${AuthServiceInfo.AUTH_SERVICE}:${AuthServiceInfo.AUTH_SERVICE_PORT}`;
  static readonly AUTH_SERVICE_API_URL = `${AuthServiceInfo.AUTH_SERVICE_URL}`;
  static readonly AUTH_SERVICE_LOGIN_URL = `${AuthServiceInfo.AUTH_SERVICE_API_URL}/login`;
  static readonly AUTH_SERVICE_REGISTER_URL = `${AuthServiceInfo.AUTH_SERVICE_API_URL}/register`;
  static readonly AUTH_SERVICE_REFRESH_TOKEN_URL = `${AuthServiceInfo.AUTH_SERVICE_API_URL}/refresh-token`;
}