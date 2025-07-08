import type { FormFieldPrefillRow } from "../utils/types";

type FormDeletePorps = {
    row: FormFieldPrefillRow;
    onDelete: (row: FormFieldPrefillRow) => void;
};

const FormDelete = ({ row, onDelete }: FormDeletePorps) => {
    return (
        <div className="flex flex-col items-center gap-y-1">
            <h2 className='text-xl font-bold'>Delete Prefill</h2>
            <p className="text-center">Are you sure you want to delete the prefill?</p>
            
            <p className="flex items-center flex-wrap gap-1">
                <span>{row.formName}</span>
                <span className="bg-gray-200 text-gray-800 px-2 py-0.5 rounded font-mono">
                    {row.fieldName}
                </span>
                <span className="mx-1 text-gray-500">→</span>
                <span>{row.prefillFrom?.formName}</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded font-mono">
                    {row.prefillFrom?.field}
                </span>
            </p>
            <div className="mt-4 space-x-2">
                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => onDelete(row)} title="Delete" aria-label="Delete">
                    Delete
                </button>
            </div>
        </div>
    );
};

export default FormDelete;