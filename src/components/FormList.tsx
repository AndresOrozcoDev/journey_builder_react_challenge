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
          <tr>
            <th className="border px-4 py-2">Formulario</th>
            <th className="border px-4 py-2">Campo</th>
            <th className="border px-4 py-2">Prefill desde</th>
            <th className="border px-4 py-2">Editar</th>
            <th className="border px-4 py-2">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td className="border px-4 py-2">{row.formName}</td>
              <td className="border px-4 py-2">
                <span className="bg-gray-200 text-xs px-2 py-1 rounded font-mono">
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
                  <button onClick={() => onAction("edit", row)} className="text-yellow-600 hover:underline">✏️ Editar</button>
                ) : (
                  <button onClick={() => onAction("create", row)} className="text-blue-600 hover:underline font-medium">➕ Configurar</button>
                )}
              </td>
              <td className="border px-4 py-2 text-center">
                {row.prefillFrom && (
                  <button onClick={() => onAction("delete", row)} className="text-red-600 hover:underline">❌ Eliminar</button>
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