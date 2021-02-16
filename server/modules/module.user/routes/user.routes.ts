import { Application, Request, Response } from 'express';
import { ModuleUser_UserController } from '../controllers/user.controller';

export class UserRoute {
  public routes(app: Application): void {
    app.route('/users').get((req: Request, res: Response) => ModuleUser_UserController.getUsers(req, res));

    app.route('/users').post((req: Request, res: Response) => ModuleUser_UserController.createUser(req, res));
  }
}
