import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { startConnection } from './mysql';

function main() {
  // Initialize the database connection
  startConnection();
  // Initialize the express application
  app.listen(app.get('port'));
    console.log(`Server on port ${app.get('port')}`);
}
main();