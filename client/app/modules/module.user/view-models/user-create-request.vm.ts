import { pick, keys } from 'lodash';
import { ISignupValues } from '../interfaces/signup-values.interface';

export class UserCreateRequestViewModel {
  name: string = undefined;
  email: string = undefined;
  password: string = undefined;

  constructor(model: ISignupValues) {
    const pickedBody = pick(model, keys(this));

    Object.assign(this, pickedBody);
  }
}
