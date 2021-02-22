import { pick, keys } from 'lodash';

export class UserCreateRequestViewModel {
  name: string = undefined;
  email: string = undefined;
  password: string = undefined;

  constructor(model: UserCreateRequestViewModel) {
    const pickedBody = pick(model, keys(this));

    Object.assign(this, pickedBody);
  }
}
