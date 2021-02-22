import { Application, Request, Response } from 'express';
import { StandardResponseViewModel } from '../view-models';

export class Index {
  public routes(app: Application): void {
    app.route('/index').get((req: Request, res: Response) => {
      res.status(200).send(new StandardResponseViewModel(undefined, 'success'));
    });
  }
}
