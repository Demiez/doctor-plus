export interface ISignupValues {
  name: string;
  password: string;
  email: string;
  open: boolean;
  error: Error | string;
}
