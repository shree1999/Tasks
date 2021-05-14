import express from 'express';

import { keys } from './config/keys.js';
import { connectDatabase } from './config/db.js';
import Task from './models/task.model.js';

const app = express();
const PORT = keys.port || 5000;

connectDatabase(); // database connection

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', async (req, res) => {
  try {
    const task = new Task({ title: req.body.title });

    await task.save();

    res
      .status(200)
      .send({ success: true, message: `${req.body.title} created` });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, message: 'Database failure' });
  }
});

app.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    if (tasks.length === 0) {
      return res
        .status(400)
        .send({ success: false, message: 'No tasks found' });
    }

    res.send({ success: true, tasks });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ success: false, message: 'Database failure' });
  }
});

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});
