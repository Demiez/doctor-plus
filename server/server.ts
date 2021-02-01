import { MongoClient } from 'mongodb';
import app from './app';

const port: string | number = process.env.PORT || 4000;
const dbConnectionString = process.env.DB_HOST || process.env.DB_HOST_LOCAL;

MongoClient.connect(dbConnectionString, { useUnifiedTopology: true }, (err, db) => {
  console.log('Connected successfully to mongodb server');
  db.close();
});

app.listen(port, () => console.log(`Server listening on port: ${port}`));
