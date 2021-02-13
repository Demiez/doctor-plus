import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compress from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as path from 'path';
import { Index } from './routes/index';
import { UserRoute } from './modules/module.user';

const CURRENT_WORKING_DIR = process.cwd();

class App {
  public app: express.Application;
  public indexRoutes: Index = new Index();
  public userRoutes: UserRoute = new UserRoute();

  constructor() {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(compress());
    this.app.use(helmet());
    this.app.use(cors());

    this.app.use('/', express.static(path.join(CURRENT_WORKING_DIR, 'dist')));

    this.indexRoutes.routes(this.app);
    this.userRoutes.routes(this.app);
  }
}

export default new App().app;
