import * as mongoose from 'mongoose';
import app from './app';

require('mongoose').Promise = global.Promise;

const port: string | number = process.env.PORT || 4000;
const dbConnectionString = process.env.DB_HOST || process.env.DB_HOST_LOCAL;

mongoose.connect(dbConnectionString, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to database, ${dbConnectionString}`);
});

app.listen(port, () => console.log(`Server listening on port: ${port}`));
