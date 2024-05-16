interface IAuthResponse {
  access_token: string | undefined;
  expires: number | undefined;
  refresh_token: string | undefined;
}

interface IUseCredentials extends IAuthResponse {
  setCredentials: (credentails: IAuthResponse) => void;
  removeCredentials: () => void
  getAccessToken: () => string | undefined;
  getRefreshToken: () => string | undefined;
}

type AuthFormDto = {
  email: string
  password: string
}

export type { IAuthResponse, IUseCredentials, AuthFormDto };
