import { CookieOptions, NextFunction, Request, Response } from 'express';
import * as moment from 'moment';
import * as jwt from 'jsonwebtoken';
import { ErrorCodes, ForbiddenError, UnauthorizedError } from '../../../core/errors';
import BaseController from '../../../core/abstract/base-controller';
import { StandardResponseViewModel } from '../../../core/view-models';
import { ModuleAuth_AuthService } from '../services/auth.service';
import { SignInRequestViewModel } from '../view-models';
import { AuthTokenModel } from '../data-models/auth-token.dm';

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

    return this.sendSuccessResponse(res, new StandardResponseViewModel('signed out', undefined));
  }

  public authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.split(' ')[1];

      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          throw new ForbiddenError(ErrorCodes.INVALID_AUTH_PARAMS);
        }

        req.user = user;
        next();
      });
    } else {
      throw new UnauthorizedError(ErrorCodes.UNAUTHORIZED);
    }
  }

  public authorizeUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.params.userId || req.body.id;
    const isAuthorized = (req.user as AuthTokenModel).id === userId;

    if (!isAuthorized) {
      throw new UnauthorizedError(ErrorCodes.UNAUTHORIZED, ['User is not authorized for this action']);
    }

    next();
  }
}

export const ModuleAuth_AuthController: AuthController = new AuthController();
