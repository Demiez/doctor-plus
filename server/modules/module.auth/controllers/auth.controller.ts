import { CookieOptions, Request, Response } from 'express';
import * as moment from 'moment';
import BaseController from '../../../core/abstract/base-controller';
import { BaseResponseViewModel } from '../../../core/route/responses/base-response.model';
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

  public async signOut(req: Request, res: Response) {
    res.clearCookie('t');

    return this.sendSuccessResponse(res, new BaseResponseViewModel('signed out', undefined));
  }
}

export const ModuleAuth_AuthController: AuthController = new AuthController();
