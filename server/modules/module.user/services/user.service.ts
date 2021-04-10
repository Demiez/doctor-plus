import { extend, isEmpty } from 'lodash';
import { validate } from 'uuid';
import validator from 'validator';
import { IUserDocument, UserModel } from '../data-models/user.dm';
import { BadRequestError, BaseErrorSubCodes, ErrorCodes, ForbiddenError, NotFoundError } from '../../../core/errors';
import { UserCreateRequestViewModel, UserViewModel, UserRequestViewModel } from '../view-models';

interface IProjection {
  [key: string]: boolean;
}

class UserService {
  public async getUsers(params: any = {}, projection?: string | IProjection): Promise<IUserDocument[]> {
    const defaultProjection: IProjection = {
      __v: false,
      hashed_password: false,
      salt: false,
    };

    const userProjection = projection || defaultProjection;

    const users: IUserDocument[] = await UserModel.find(params, userProjection).sort('email');

    return users;
  }

  public async getUser(userId: string): Promise<UserViewModel> {
    this.validateUserId(userId);

    const user = await this.tryGetUserById(userId);

    return new UserViewModel(user);
  }

  public async getUserByQuery(query: {}, projection?: string | IProjection) {
    return await UserModel.find(query, projection);
  }

  public async tryGetUserById(userId: string, projection: string | IProjection = {}): Promise<IUserDocument> {
    const user: IUserDocument = await UserModel.findOne({ _id: userId }, projection);

    this.throwExceptionIfUserNotFound(user);

    return user;
  }

  public async tryGetUserByEmail(email: string): Promise<IUserDocument> {
    const user: IUserDocument = await UserModel.findOne({ email });

    this.throwExceptionIfUserNotFound(user);

    return user;
  }

  public async createUser(userData: UserCreateRequestViewModel) {
    await this.vaildateUserData(userData);

    const user = new UserModel(userData);

    await user.save();

    return new UserViewModel(user);
  }

  public async updateUser(userData: UserRequestViewModel): Promise<UserViewModel> {
    let user = await this.tryGetUserById(userData.id);

    user = extend(user, userData);
    user.updatedOn = new Date(Date.now());

    await user.save();

    return new UserViewModel(user);
  }

  public async deleteUser(userId: string): Promise<UserViewModel> {
    this.validateUserId(userId);

    const user = await this.tryGetUserById(userId);

    await user.remove();

    return new UserViewModel(user);
  }

  private throwExceptionIfUserNotFound(user: IUserDocument) {
    if (!user) {
      throw new NotFoundError(ErrorCodes.RECORD_NOT_FOUND, ['user not found']);
    }
  }

  private validateUserId(userId: string) {
    // find out if first check needed
    if (!userId) {
      throw new ForbiddenError(BaseErrorSubCodes.INVALID_INPUT_PARAMS_IS_REQUIRED, ['provide userId']);
    }

    if (!validate(userId)) {
      throw new BadRequestError(BaseErrorSubCodes.INVALID_INPUT_PARAMS_IS_BAD_VALUE, ['provide valid userId']);
    }
  }

  private async vaildateUserData(userData: UserCreateRequestViewModel) {
    if (isEmpty(userData)) {
      throw new ForbiddenError(BaseErrorSubCodes.INVALID_INPUT_PARAMS_IS_REQUIRED, ['provide correct user data']);
    }

    Object.keys(userData).forEach((key: string) => {
      if (isEmpty((userData as { [index: string]: any })[key])) {
        throw new BadRequestError(BaseErrorSubCodes.INVALID_INPUT_PARAMS_IS_BAD_VALUE, [`field '${key}' is empty`]);
      }
    });

    if (!validator.isEmail(userData.email)) {
      throw new BadRequestError(BaseErrorSubCodes.INVALID_INPUT_PARAMS_IS_BAD_VALUE, [
        `field 'email' is not a valid email address`,
      ]);
    }

    if (userData.password.length < 6) {
      throw new BadRequestError(BaseErrorSubCodes.INVALID_INPUT_PARAMS_IS_BAD_VALUE, [
        `field 'password' must have min 6 characters`,
      ]);
    }

    const user = await UserModel.findOne({ email: userData.email });

    if (user) {
      throw new ForbiddenError(BaseErrorSubCodes.INVALID_INPUT_PARAMS_IS_DUPLICATE_RECORD, [
        'user with such email already exists',
      ]);
    }
  }
}

export const ModuleUser_UserService: UserService = new UserService();
