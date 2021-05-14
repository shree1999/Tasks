import express from 'express';

import { keys } from './config/keys.js';
import { connectDatabase } from './config/db.js';

const app = express();
const PORT = keys.port || 5000;

connectDatabase(); // database connection

app.get('/', (req, res) => {
  res.setHeader('Content-type', 'application/json');

  res.send({ success: true, message: 'Server running hurray!' });
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
