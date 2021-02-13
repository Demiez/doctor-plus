import { Request, Response } from 'express';
import BaseController from '../../../core/abstract/base-controller';

class UserController extends BaseController {
  public async getUsers(req: Request, res: Response) {
    return this.sendSuccessResponse(res, 'Users List');
  }

  public async createUser(req: Request, res: Response) {
    return this.sendSuccessResponse(res, 'User Created');
  }
}

export const ModuleUser_UserController: UserController = new UserController();
