import { IUserDocument, UserModel } from '../data-models/user.dm';
import { BadRequestError } from '../../../core/errors/error-response';
import { getErrorMessage } from '../../../core/utils/db-error-handler';

interface IProjection {
  [key: string]: boolean;
}

class UserService {
  public async getUsers(params: any = {}, projection?: string | IProjection): Promise<IUserDocument[]> {
    const defaultProjection: IProjection = {
      __v: false,
      hashed_password: false,
    };

    const userProjection = projection || defaultProjection;

    const users: IUserDocument[] = await UserModel.find(params, userProjection).sort('email');

    return users;
  }

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
