export interface IRefreshResponse {
  accessToken: string;
}
export interface IAuthContext {
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
  refresh: () => Promise<void>;
}
export interface IAuthProviderProps {
  children: React.ReactNode;
}

export interface IAuthResponse {
  accessToken: string;
}

export interface IApiResponse<T> {
  apiVersion: string;
  data: T;
}
export interface ICreateUserRequest {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}
export interface ISignInRequest {
  email: string;
  password: string;
}
