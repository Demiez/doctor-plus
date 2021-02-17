import { UserModel } from '../data-models/user.dm';
import { BadRequestError } from '../../../core/errors/error-response';
import { getErrorMessage } from '../../../core/utils/db-error-handler';

class UserService {
  public async createUser(userData: {}) {
    const user = new UserModel(userData);

    try {
      await user.save();
    } catch (err) {
      throw new BadRequestError(getErrorMessage(err), ['user not created']);
    }

    return user;
  }
}

export const ModuleUser_UserService: UserService = new UserService();
