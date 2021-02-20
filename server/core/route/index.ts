import { Application, Request, Response } from 'express';
import { BaseResponseViewModel } from './responses/base-response.model';

export class Index {
  public routes(app: Application): void {
    app.route('/index').get((req: Request, res: Response) => {
      res.status(200).send(new BaseResponseViewModel(undefined, 'success'));
    });
  }
}
