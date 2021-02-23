import * as jwt from 'jsonwebtoken';

import { ErrorCodes, ForbiddenError, UnauthorizedError } from '../../../core/errors';
import { FieldIsRequiredViewModel } from '../../../core/view-models';
import { ModuleUser_UserService } from '../../module.user';
import { SignInRequestViewModel, SignInResponseViewModel } from '../view-models';

class AuthService {
  public async signIn(signinData: SignInRequestViewModel): Promise<SignInResponseViewModel> {
    const { email, password } = signinData;

    if (!email) {
      throw new ForbiddenError(ErrorCodes.INVALID_INPUT_PARAMS, [new FieldIsRequiredViewModel('email')]);
    }

    if (!password) {
      throw new ForbiddenError(ErrorCodes.INVALID_INPUT_PARAMS, [new FieldIsRequiredViewModel('password')]);
    }

    const user = await ModuleUser_UserService.tryGetUserByEmail(email);

    if (!user.authenticate(password)) {
      throw new UnauthorizedError(ErrorCodes.UNAUTHORIZED, ["Email and password don't match"]);
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    return new SignInResponseViewModel(token, user);
  }
}

export const ModuleAuth_AuthService: AuthService = new AuthService();
