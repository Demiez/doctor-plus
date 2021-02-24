export class AuthTokenModel {
  public iat: number;
  public id: string;

  constructor(user: { iat: number; id: string }) {
    this.iat = user.iat;
    this.id = user.id;
  }
}
