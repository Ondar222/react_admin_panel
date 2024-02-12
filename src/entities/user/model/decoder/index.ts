interface DirectusUserResponse extends Object {
  id: string;
  surname: string;
  name: string;
  email: string;
  password: string;
  location: string;
  title: string;
  description: null;
  tags: null;
  avatar: null;
  language: string;
  theme: string;
  tfa_secret: null;
  status: string;
  role: string;
  token: null;
  last_access: string;
  last_page: string;
  phone: string;
}

class UserResponseDecoder {
  constructor(user: DirectusUserResponse) {
    this.id = user.id;
    this.name = user.name;
    this.surname = user.surname;
    this.phone = user.phone;
    this.email = user.email;
  }

  id: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
}

export { UserResponseDecoder };
export type { DirectusUserResponse };
