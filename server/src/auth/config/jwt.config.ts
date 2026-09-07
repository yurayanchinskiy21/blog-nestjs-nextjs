import { registerAs } from '@nestjs/config';

export interface IJwtConfig {
  secret: string;
  audience: string;
  issuer: string;
  accessTokenTtl: number;
  refreshTokenTtl: number;
  googleClientId: string;
  googleClientSecret: string;
}

export default registerAs('jwt', (): IJwtConfig => ({
  secret: process.env.JWT_SECRET || 'your-secret-key',
  audience: process.env.JWT_AUDIENCE || 'your-audience',
  issuer: process.env.JWT_ISSUER || 'your-issuer',
  accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL ?? '3600', 10),
  refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL ?? '86400', 10),
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
}));
