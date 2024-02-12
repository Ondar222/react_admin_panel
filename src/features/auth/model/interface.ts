interface IUseAuth {
  isAuth: boolean,
  checkAuth: () => void,
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

interface IAuthResponse {
  access_token: string | undefined;
  expires: number | undefined;
  refresh_token: string | undefined;
}

interface IUseCredentails extends IAuthResponse {
  actions: {
    setCredentails: (credentails: IAuthResponse) => void;
    refresh: () => void;
    getAccessToken: () => string | undefined;
    getRefreshToken: () => string | undefined;
  }

}

export type { IUseAuth, IAuthResponse, IUseCredentails };
