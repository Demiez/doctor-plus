import { CookieOptions, Request, Response } from 'express';
import * as moment from 'moment';
import BaseController from '../../../core/abstract/base-controller';
import { ModuleAuth_AuthService } from '../services/auth.service';
import { SignInRequestViewModel } from '../view-models';

class AuthController extends BaseController {
  public async signIn(req: Request, res: Response) {
    const signinData = new SignInRequestViewModel(req.body);

    const responseData = await ModuleAuth_AuthService.signIn(signinData);

    const options: CookieOptions = { expires: moment().add(9999, 'd').toDate() };

    res.cookie('t', responseData.token, options);

    return this.sendSuccessResponse(res, responseData);
  }
}

export const ModuleAuth_AuthController: AuthController = new AuthController();
