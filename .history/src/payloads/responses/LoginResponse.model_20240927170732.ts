interface IDictionary<T> {
  [key: string]: T;
}

interface TokenData {
  accessToken: string;
  refreshToken: string;
}

interface UserLoginData {
  userId: number;
  role: string;
  token: TokenData;
}

export interface LoginResponse {
  data: UserLoginData;
  errors: IDictionary<string[]>;
  isSuccess: boolean;
  message: string;
  statusCode: number;
}
