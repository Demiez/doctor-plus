import { Application, Request, Response } from 'express';
import { wrapRouteAction } from '../../../core/route/route-wrapper';

export class AuthRoute {
  public routes(app: Application): void {
    app.route('/auth/signin').post(wrapRouteAction((req: Request, res: Response) => console.dir()));

    app.route('/auth/signout').get(wrapRouteAction((req: Request, res: Response) => console.dir()));
  }
}
