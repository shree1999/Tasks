import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

interface ITask {
  title: string;
  _id: string;
  _v: string;
}

interface IErrorResponse {
  success: boolean;
  message: string;
}

interface IResponse {
  success: boolean;
  tasks: Array<ITask>;
}

export const App: React.FC = () => {
  const [taskData, setTaskData] = useState<IResponse | null>(null);
  const [error, setError] = useState<IErrorResponse | null>(null);
  const [task, setTask] = useState<string>('');

  const loadTasks = async () => {
    try {
      const res = await axios.get<IResponse>('/api/');
      setTaskData(res.data);
      setError(null);
    } catch (err) {
      console.error(err.response);
      setError(err.response.data);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post('/api/', { title: task });
      console.log(res.data);
      loadTasks();
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <h1 className="display-2">Task-Creator</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Task"
              value={task}
              onChange={e => setTask(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>

        <h2 className="display-3">Tasks Created: </h2>

        {error && <div className="alert alert-danger">{error.message}</div>}

        {taskData?.success &&
          taskData.tasks.length > 0 &&
          taskData.tasks.map(t => (
            <div className="alert alert-secondary" key={t._id}>
              {t.title}
            </div>
          ))}
      </div>
    </div>
  );
};
