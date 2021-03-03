import BaseController from '../../../core/abstract/base-controller';
import { GET_USERS_URI } from '../constants/uri.constants';
import { UserViewModel } from '../view-models';

class UserController extends BaseController {
  public async createUser(): Promise<{}> {
    return null;
  }

  public async getUsers(signal: AbortSignal) {
    return await this.sendGetRequest<UserViewModel[]>(GET_USERS_URI, signal);
  }
}

export const ModuleUser_UserController: UserController = new UserController();
