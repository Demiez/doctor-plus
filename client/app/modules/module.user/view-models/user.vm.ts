export class UserViewModel {
  public id: string;
  public name: string;
  public email: string;
  public createdOn: Date;
  public updatedOn: Date;

  constructor(userData: UserViewModel) {
    this.id = userData.id;
    this.name = userData.name;
    this.email = userData.email;
    this.createdOn = userData.createdOn;
    this.updatedOn = userData.updatedOn;
  }
}
