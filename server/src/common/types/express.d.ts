declare global {
  namespace Express {
    interface Request {
      cookies: {
        refreshToken?: string;
      };
    }
  }
}

export {};
