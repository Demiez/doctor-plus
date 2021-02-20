import { IUserDocument, UserRequestViewModel } from '../../module.user';

export class SignInResponseViewModel {
  public token: string;
  public user: UserRequestViewModel;

  constructor(token: string, userData: IUserDocument) {
    this.token = token;
    this.user = new UserRequestViewModel(userData);
  }
}
