import { Application, Request, Response } from 'express';
import { ModuleUser_UserController } from '../controllers/user.controller';
import { wrapRouteAction } from '../../../core/route/route-wrapper';

export class UserRoute {
  public routes(app: Application): void {
    app
      .route('/users')
      .get(wrapRouteAction((req: Request, res: Response) => ModuleUser_UserController.getUsers(req, res)));

    app
      .route('/users/:userId')
      .get(wrapRouteAction((req: Request, res: Response) => ModuleUser_UserController.getUser(req, res)));

    app
      .route('/users')
      .post(wrapRouteAction((req: Request, res: Response) => ModuleUser_UserController.createUser(req, res)));

    app
      .route('/users/:userId')
      .put(wrapRouteAction((req: Request, res: Response) => ModuleUser_UserController.updateUser(req, res)));
  }
}
