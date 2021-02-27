import BaseController from '../../../core/abstract/base-controller';

class UserController extends BaseController {
  public async createUser(): Promise<{}> {
    return null;
  }
}

export const ModuleUser_UserController: UserController = new UserController();
