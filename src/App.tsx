import './App.css';
import { useEffect, useState } from 'react';
import { GetActionBlueprintGraph } from './services/avantosApi';
import FormList from './components/FormList';
import type { FormFieldPrefillRow } from './utils/types';
import { getFormFieldsWithPrefill, setGraph } from './utils/graph';
import Modal from "./components/Modal";
import Loading from './components/Loader';
import Toast from './components/Toast';
import FormDelete from './components/FormDelete';
import FormPrefill from './components/FormPrefill';

type ActionType = "create" | "edit" | "delete" | null;

function App() {
  const [modalAction, setModalAction] = useState<ActionType>(null);
  const [rows, setRows] = useState<FormFieldPrefillRow[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedRow, setSelectedRow] = useState<FormFieldPrefillRow | null>(null);

  useEffect(() => {
    GetActionBlueprintGraph()
      .then((data) => {
        setGraph(data);
        const parsed = getFormFieldsWithPrefill(data);
        setRows(parsed);
        setError(null);
      })
      .catch((err) => {
        const message = err instanceof Error ? err.message : "Error";
        setError(`Error: ${message}`);
      })
      .finally(() => {
        setLoading(false);
      });;
  }, []);

  const handleAction = (type: ActionType, row: FormFieldPrefillRow) => {
    setModalAction(type);
    setSelectedRow(row);
  };

  const handleCloseModal = () => {
    setModalAction(null);
  };

  const handleSavePrefill = (updated: FormFieldPrefillRow) => {
  console.log("Updating:", updated);
  handleCloseModal();
};

  const handleDelete = (row: FormFieldPrefillRow) => {
    console.log("Deleting:", row);
    handleCloseModal();
  };

  return (
    <div className='bg-neutral-100 h-dvh w-screen text-center px-4 py-6 flex flex-col gap-y-5'>
      <h2 className='text-xl font-bold'>Journey Builder</h2>

      {loading ? (
        <Loading />
      ) : (
        <>
          {error && <Toast message={error} type="error" />}

          {rows.length === 0 ? (
            <div className="w-full bg-white rounded-lg shadow-lg p-4 text-center">
              <span className="text-gray-500 italic">No information available.</span>
            </div>
          ) : (
            <FormList rows={rows} onAction={handleAction} />
          )}
        </>
      )}

      <Modal isOpen={modalAction !== null} onClose={handleCloseModal}>
        {(modalAction === "create" || modalAction === "edit") && selectedRow && (
          <FormPrefill row={selectedRow} onSave={handleSavePrefill} />
        )}
        {modalAction === "delete" && selectedRow && (
          <FormDelete row={selectedRow} onDelete={handleDelete} />
        )}
      </Modal>

    </div>
  )
}

export default App
