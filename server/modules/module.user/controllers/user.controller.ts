import { Request, Response } from 'express';
import BaseController from '../../../core/abstract/base-controller';
import { ModuleUser_UserService } from '../services/user.service';
import { validate } from 'uuid';
import { BadRequestError } from '../../../core/errors/error-response';
import { BaseErrorSubCodes } from '../../../core/errors/base-error-codes';

class UserController extends BaseController {
  public async getUsers(req: Request, res: Response) {
    const result = await ModuleUser_UserService.getUsers(undefined, 'name email createdOn updatedOn');

    return this.sendSuccessResponse(res, result);
  }

  public async getUserById(req: Request, res: Response) {
    const { userId } = req.params;

    if (!validate(userId)) {
      throw new BadRequestError(BaseErrorSubCodes.INVALID_INPUT_PARAMS_IS_BAD_VALUE, ['provide valid userId']);
    }

    return this.sendSuccessResponse(res, 'User by Id');
  }

  public async createUser(req: Request, res: Response) {
    const userData = req.body;

    const result = await ModuleUser_UserService.createUser(userData);

    return this.sendSuccessResponse(res, result);
  }

  public async updateUser(req: Request, res: Response) {
    return this.sendSuccessResponse(res, 'User Updated');
  }

  public async deleteUser(req: Request, res: Response) {
    return this.sendSuccessResponse(res, 'User Deleted');
  }
}

export const ModuleUser_UserController: UserController = new UserController();
