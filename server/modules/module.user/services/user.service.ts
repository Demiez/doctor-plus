import { validate } from 'uuid';
import { IUserDocument, UserModel } from '../data-models/user.dm';
import { BadRequestError, BaseErrorSubCodes, ErrorCodes, ForbiddenError, NotFoundError } from '../../../core/errors';
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

  public async getUserById(userId: string): Promise<IUserDocument> {
    if (!userId) {
      throw new ForbiddenError(BaseErrorSubCodes.INVALID_INPUT_PARAMS_IS_REQUIRED, ['provide userId']);
    }

    if (!validate(userId)) {
      throw new BadRequestError(BaseErrorSubCodes.INVALID_INPUT_PARAMS_IS_BAD_VALUE, ['provide valid userId']);
    }

    return this.tryGetUserById(userId);
  }

  public async tryGetUserById(userId: string, projection: string | IProjection = {}): Promise<IUserDocument> {
    const user = await UserModel.findOne({ _id: userId }, projection);

    this.throwExceptionIfUserNotFound(user);

    return user;
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

  private throwExceptionIfUserNotFound(user: IUserDocument) {
    if (!user) {
      throw new NotFoundError(ErrorCodes.RECORD_NOT_FOUND, ['user not found']);
    }
  }
}

export const ModuleUser_UserService: UserService = new UserService();
