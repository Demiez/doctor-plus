import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import { Index } from './routes/index';

const CURRENT_WORKING_DIR = process.cwd();

class App {
  public app: express.Application;
  public indexRoutes: Index = new Index();

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use('/', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));
    this.indexRoutes.routes(this.app);
  }
}

export default new App().app;
