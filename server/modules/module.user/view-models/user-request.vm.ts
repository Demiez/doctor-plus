import { IUserDocument } from '../data-models/user.dm';
export class UserRequestViewModel {
  id: string;
  name: string;
  email: string;

  constructor(userData: IUserDocument) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
  }
}
