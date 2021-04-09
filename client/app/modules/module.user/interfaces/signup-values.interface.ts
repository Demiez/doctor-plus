import { AxiosError } from 'axios';
export interface ISignupValues {
  name: string;
  password: string;
  email: string;
  open: boolean;
  error: AxiosError | Error | string;
}
