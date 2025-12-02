export type AuthMode = 'login' | 'register';

export type User = {
  id: number;
  username: string;
  password: string;
};

export type AuthCredentialsDto = {
  username: string;
  password: string;
};

export type RegisterPayload = AuthCredentialsDto & {
  gender: 'male' | 'female' | 'other';
  source: string;

  birthDay: string;
  birthMonth: string;
  birthYear: string;

  newsletter?: boolean;
};

export type RegisterFormValues = RegisterPayload & {
  repeatPassword: string;
  acceptTerms: boolean;
};
