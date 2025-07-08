import type { FormFieldPrefillRow } from "../utils/types";

type FormListPorps = {
  rows: FormFieldPrefillRow[];
  onAction: (type: "create" | "edit" | "delete", row: FormFieldPrefillRow) => void;
};

const FormList = ({ rows, onAction }: FormListPorps) => {

  return (
    <div className="w-full bg-white rounded-lg shadow-lg overflow-auto">
      <table className="w-full table-auto border border-gray-400 border-collapse">
        <thead>
          <tr className="bg-neutral-200">
            <th className="border px-4 py-2">Form</th>
            <th className="border px-4 py-2">Field</th>
            <th className="border px-4 py-2">Prefill</th>
            <th className="border px-4 py-2">Edit</th>
            <th className="border px-4 py-2">Delete</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{row.formName}</td>
              <td className="border px-4 py-2">
                <span className="bg-gray-100 text-xs px-2 py-1 rounded font-mono">
                  {row.fieldName}
                </span>
              </td>
              <td className="border px-4 py-2">
                {row.prefillFrom ? (
                  <>
                    {row.prefillFrom.formName} {'>'}{' '}
                    <span className="bg-gray-100 text-xs px-1 py-0.5 rounded font-mono">
                      {row.prefillFrom.field}
                    </span>
                  </>
                ) : (
                  <span className="text-gray-400 italic">–</span>
                )}
              </td>
              <td className="border px-4 py-2 text-center">
                {row.prefillFrom ? (
                  <button type="button" onClick={(e) => {e.preventDefault(); onAction("edit", row)}} className="text-yellow-600 hover:underline" aria-label="Edit" title="Edit">✏️</button>
                ) : (
                  <button type="button" onClick={(e) => {e.preventDefault(); onAction("create", row)}} className="text-blue-600 hover:underline font-medium" aria-label="Create" title="Create">➕</button>
                )}
              </td>
              <td className="border px-4 py-2 text-center">
                {row.prefillFrom && (
                  <button type="button" onClick={(e) => {e.preventDefault(); onAction("delete", row)}} className="text-red-600 hover:underline" aria-label="Delete" title="Delete">❌</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
};

export default FormList;