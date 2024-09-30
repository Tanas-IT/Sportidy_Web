interface IDictionary<T> {
  [key: string]: T;
}

interface TokenData {
  accessToken: string;
  refreshToken: string;
}

export interface UserLoginData {
  UserId: number;
  role: string;
  email: string;
  Status: string;
  DeviceCode: string;
  FullName: string;
}

export interface LoginResponse {
  token: TokenData;
  message: string;
  httpCode: number;
}
