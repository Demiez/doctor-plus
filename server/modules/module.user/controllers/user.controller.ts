import { Request, Response } from 'express';
import BaseController from '../../../core/abstract/base-controller';
import { ModuleUser_UserService } from '../services/user.service';
import { UserCreateRequestViewModel, UserRequestViewModel } from '../view-models';

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
    const userData = req.body as UserCreateRequestViewModel;

    const createdUser = await ModuleUser_UserService.createUser(userData);

    return this.sendSuccessResponse(res, createdUser);
  }

  public async updateUser(req: Request, res: Response) {
    const userData = req.body as UserRequestViewModel;

    const updatedUser = await ModuleUser_UserService.updateUser(userData);

    return this.sendSuccessResponse(res, updatedUser);
  }

  public async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;

    const deletedUser = await ModuleUser_UserService.deleteUser(userId);

    return this.sendSuccessResponse(res, deletedUser);
  }
}

export const ModuleUser_UserController: UserController = new UserController();
