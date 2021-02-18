import { Request, Response } from 'express';
import BaseController from '../../../core/abstract/base-controller';
import { ModuleUser_UserService } from '../services/user.service';

class UserController extends BaseController {
  public async getUsers(req: Request, res: Response) {
    const result = await ModuleUser_UserService.getUsers(undefined, 'name email createdOn updatedOn');

    return this.sendSuccessResponse(res, result);
  }

  public async getUser(req: Request, res: Response) {
    const { userId } = req.params;

    const result = await ModuleUser_UserService.getUser(userId);

    return this.sendSuccessResponse(res, result);
  }

  public async createUser(req: Request, res: Response) {
    const userData = req.body;

    const result = await ModuleUser_UserService.createUser(userData);

    return this.sendSuccessResponse(res, result);
  }

  public async updateUser(req: Request, res: Response) {
    const userData = req.body;

    const result = await ModuleUser_UserService.updateUser(userData);

    return this.sendSuccessResponse(res, result);
  }

  public async deleteUser(req: Request, res: Response) {
    return this.sendSuccessResponse(res, 'User Deleted');
  }
}

export const ModuleUser_UserController: UserController = new UserController();
