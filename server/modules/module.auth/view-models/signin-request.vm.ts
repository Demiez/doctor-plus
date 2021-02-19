import { pick, keys } from 'lodash';

export class SignInRequestViewModel {
  public email: string = undefined;
  public password: string = undefined;

  constructor(model: SignInRequestViewModel) {
    const pickedBody = pick(model, keys(this));

    Object.assign(this, pickedBody);
  }
}
