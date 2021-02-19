import { Request, Response } from 'express';
import BaseController from '../../../core/abstract/base-controller';
import { ModuleAuth_AuthService } from '../services/auth.service';
import { SignInRequestViewModel } from '../view-models';

class AuthController extends BaseController {
  public async signIn(req: Request, res: Response) {
    const signinData = new SignInRequestViewModel(req.body);

    await ModuleAuth_AuthService.signIn(signinData);
  }
}

export const ModuleAuth_AuthController: AuthController = new AuthController();
