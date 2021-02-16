import * as express from 'express';
import { NextFunction, Response, Request } from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compress from 'compression';
import * as cors from 'cors';
import * as helmet from 'helmet';
import * as path from 'path';
import { ErrorResponse, PostbackUniversalError } from './core/errors/error-response';
import { ErrorResponseTypes } from './core/enums/error-response-types.enum';
import { BaseErrorCodes } from './core/errors/base-error-codes';
import { Index } from './core/route/index';
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

    this.app.use((error: ErrorResponse, req: Request, res: Response, next: NextFunction) => {
      if (error.type === ErrorResponseTypes.BAD_REQUEST) {
        const errorMessage =
          error.errorDetails && error.errorDetails.length > 0
            ? error.message + ': ' + error.errorDetails[0]
            : error.message;

        return res.status(400).send(error);
      }

      if (error.type === ErrorResponseTypes.POSTBACK_UNIVERSAL_REQUEST) {
        const universalError = error as PostbackUniversalError;

        return res.status(400).send(universalError.model);
      }

      if (error.type === ErrorResponseTypes.UNAUTHORIZED) {
        const errorMessage =
          error.errorDetails && error.errorDetails.length > 0
            ? error.message + ': ' + error.errorDetails[0]
            : error.message;

        return res.status(401).json(error);
      }

      if (error.type === ErrorResponseTypes.FORBIDDEN) {
        const errorMessage =
          error.errorDetails && error.errorDetails.length > 0
            ? error.message + ': ' + error.errorDetails[0]
            : error.message;

        return res.status(403).send(error);
      }

      if (error.type === ErrorResponseTypes.NOT_FOUND) {
        const errorMessage =
          error.errorDetails && error.errorDetails.length > 0
            ? error.message + ': ' + error.errorDetails[0]
            : error.message;

        return res.status(404).send(error);
      }

      if (error.type === ErrorResponseTypes.INTERNAL_SERVER_ERROR) {
        const errorMessage =
          error.errorDetails && error.errorDetails.length > 0
            ? error.message + ': ' + error.errorDetails[0]
            : error.message;

        return res.status(500).send(error);
      }

      return res
        .status(500)
        .send(new ErrorResponse(BaseErrorCodes.INTERNAL_SERVER_ERROR, [{ message: JSON.stringify(error) }]));
    });
  }
}

export default new App().app;
