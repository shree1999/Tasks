import axios from 'axios';

interface ISuccess {
  success: boolean;
  message: string;
}

export const App: React.FC = () => {
  const onClickHandler = async () => {
    try {
      const res = await axios.get<ISuccess>('/api/');
      console.log(res.data.success);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Hello from React</h1>
      <button onClick={onClickHandler}>Talk to server</button>
    </div>
  );
};
