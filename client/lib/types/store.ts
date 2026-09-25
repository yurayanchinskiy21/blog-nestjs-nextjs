export interface IAuthStore {
  accessToken: string | null;
  setAccessToken: (accessToken: string | null) => void;
  clearAccessToken: () => void;
}
