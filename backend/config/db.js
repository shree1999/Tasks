import mongoose from 'mongoose';

import { keys } from './keys.js';

export const connectDatabase = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb://${keys.mongodbURI}/task-manager`,
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
      }
    );

    console.log('Database up and running on host ' + conn.connection.host);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
