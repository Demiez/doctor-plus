import { Request, Response } from 'express';
import BaseController from '../../../core/abstract/base-controller';
import { BadRequestError, NotFoundError } from '../../../core/errors/error-response';
import { getErrorMessage } from '../../../core/utils/db-error-handler';
import { UserModel } from '../data-models/user.dm';

class UserController extends BaseController {
  public async getUsers(req: Request, res: Response) {
    return this.sendSuccessResponse(res, 'Users List');
  }

  public async getUserById(req: Request, res: Response) {
    return this.sendSuccessResponse(res, 'User by Id');
  }

  public async createUser(req: Request, res: Response) {
    const user = new UserModel(req.body);
    try {
      await user.save();
    } catch (err) {
      throw new BadRequestError(getErrorMessage(err), ['user']);
    }

    return this.sendSuccessResponse(res, 'User Created');
  }

  public async updateUser(req: Request, res: Response) {
    return this.sendSuccessResponse(res, 'User Updated');
  }

  public async deleteUser(req: Request, res: Response) {
    return this.sendSuccessResponse(res, 'User Deleted');
  }
}

export const ModuleUser_UserController: UserController = new UserController();
