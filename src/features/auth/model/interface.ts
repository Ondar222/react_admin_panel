interface IUseAuth {
  isAuth: boolean;
  checkAuth: () => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface IAuthResponse {
  access_token: string | undefined;
  expires: number | undefined;
  refresh_token: string | undefined;
}

interface IUseCredentails extends IAuthResponse {
  setCredentails: (credentails: IAuthResponse) => void;
  refresh: () => void;
  getAccessToken: () => string | undefined;
  getRefreshToken: () => string | undefined;
}

type AuthFormDto = {
  email: string
  password: string
}

export type { IUseAuth, IAuthResponse, IUseCredentails, AuthFormDto };
