import { Application, Request, Response } from 'express';
import { wrapRouteAction } from '../../../core/route/route-wrapper';
import { ModuleAuth_AuthController } from '../controllers/auth.controller';

export class AuthRoute {
  public routes(app: Application): void {
    app
      .route('/auth/signin')
      .post(wrapRouteAction((req: Request, res: Response) => ModuleAuth_AuthController.signIn(req, res)));

    app.route('/auth/signout').get(wrapRouteAction((req: Request, res: Response) => console.dir()));
  }
}
