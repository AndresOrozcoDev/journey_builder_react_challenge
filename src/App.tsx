import './App.css';
import { useEffect, useState } from 'react';
import { GetActionBlueprintGraph } from './services/avantosApi';
import FormList from './components/FormList';
import type { FormFieldPrefillRow } from './utils/types';
import { getFormFieldsWithPrefill } from './utils/graph';
import Modal from "./components/Modal";
import Loading from './components/Loader';
import Toast from './components/Toast';

type ActionType = "create" | "edit" | "delete" | null;

function App() {
  const [modalAction, setModalAction] = useState<ActionType>(null);
  const [rows, setRows] = useState<FormFieldPrefillRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    GetActionBlueprintGraph()
      .then((data) => {
        const parsed = getFormFieldsWithPrefill(data);
        setRows(parsed);
        setError(null);
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Error desconocido";
        setError(`Error: ${message}`);
      })
      .finally(() => {
        setLoading(false);
      });;
  }, []);

  const handleAction = (type: ActionType) => {
    setModalAction(type);
  };

  const handleCloseModal = () => {
    setModalAction(null);
  };

  return (
    <div className='bg-neutral-100 h-dvh w-screen text-center px-4 py-6 flex flex-col gap-y-5'>
      <h2 className='text-xl font-bold'>Journey Builder</h2>

      {loading ? (
        <Loading />
      ) : error ? (
        <Toast message={error} type="error" />
      ) : (
        <FormList rows={rows} onAction={handleAction} />
      )}

      <Modal isOpen={modalAction !== null} onClose={handleCloseModal}>
        <p className="text-lg font-semibold capitalize">
          {modalAction}
        </p>
      </Modal>

    </div>
  )
}

export default App
