import { Application, Request, Response } from 'express';

export class UserRoute {
  public routes(app: Application): void {
    app.route('/users').get((req: Request, res: Response) => {
      res.status(200).send({ status: 'success' });
    });
  }
}
