import { RequestHandler, Response } from 'express-serve-static-core';
import { NextFunction, Request } from 'express';

export function wrapRouteAction(action: RequestHandler) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await action(req, res, next);
    } catch (e) {
      return next(e);
    }
  };
}
