import BaseController from '../../../core/abstract/base-controller';
import { BASIC_USERS_URI } from '../constants/uri.constants';
import { UserViewModel, UserCreateRequestViewModel } from '../view-models';

class UserController extends BaseController {
  public async createUser(user: UserCreateRequestViewModel) {
    return await this.sendPostRequest<UserCreateRequestViewModel>(BASIC_USERS_URI, user);
  }

  public async getUsers(signal: AbortSignal) {
    return await this.sendGetRequest<UserViewModel[]>(BASIC_USERS_URI, signal);
  }
}

export const ModuleUser_UserController: UserController = new UserController();
