import { ErrorCodes, ForbiddenError, FieldIsRequiredModel } from '../../../core/errors';
import { IUserDocument, UserModel } from '../../module.user/';
import { SignInRequestViewModel } from '../view-models';

class AuthService {
  public async signIn(signinData: SignInRequestViewModel) {
    const { email, password } = signinData;

    if (!email) {
      throw new ForbiddenError(ErrorCodes.INVALID_INPUT_PARAMS, [new FieldIsRequiredModel('email')]);
    }

    if (!password) {
      throw new ForbiddenError(ErrorCodes.INVALID_INPUT_PARAMS, [new FieldIsRequiredModel('password')]);
    }
  }
}

export const ModuleAuth_AuthService: AuthService = new AuthService();
