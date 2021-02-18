import { IUserDocument } from '../data-models/user.dm';

export class UserViewModel {
  public name: string;
  public email: string;
  public createdOn: Date;
  public updatedOn: Date;

  constructor(userData: IUserDocument) {
    this.name = userData.name;
    this.email = userData.email;
    this.createdOn = userData.createdOn;
    this.updatedOn = userData.updatedOn;
  }
}
