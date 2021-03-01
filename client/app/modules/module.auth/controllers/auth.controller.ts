import BaseController from '../../../core/abstract/base-controller';

class AuthController extends BaseController {
  public async signIn(): Promise<{}> {
    return null;
  }

  public async signOut(): Promise<{}> {
    return null;
  }
}

export const ModuleAuth_AuthController: AuthController = new AuthController();
