import './App.css';
import { useEffect } from 'react';
import { GetActionBlueprintGraph } from './services/avantosApi';
import FormList from './components/FormList';

function App() {

  useEffect(() => {
    GetActionBlueprintGraph()
      .then((data) => {
        console.table(data);
      })
      .catch((err) => {
        console.error('Error:', err);
      });
  }, []);

  return (
    <div className='bg-neutral-100 h-dvh w-screen text-center px-4 py-6 flex flex-col gap-y-5'>
      <h2 className='text-xl font-bold'>Journey Builder</h2>
      <FormList />
    </div>
  )
}

export default App
