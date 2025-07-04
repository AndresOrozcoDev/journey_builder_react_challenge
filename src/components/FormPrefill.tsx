import type { FormFieldPrefillRow } from "../utils/types";

type FormPrefillPorps = {
    row: FormFieldPrefillRow | null;
    onClose: () => void;
};

const FormPrefill = ({ row, onClose }: FormPrefillPorps) => {
    return (
        <div className="flex flex-col items-center gap-y-1">
            <h2 className='text-xl font-bold'>Prefill setting</h2>
            <p>Set a Prefill</p>

            <div className="flex flex-row w-full items-center">
                <div className="flex flex-col gap-y-2 w-[45%]">
                    <input
                        disabled
                        value={row?.formName}
                        className="px-2 py-1 border rounded w-full bg-gray-100"
                    />
                    <input
                        disabled
                        value={row?.fieldName}
                        className="px-2 py-1 border rounded w-full bg-gray-100"
                    />
                </div>
                <div className="w-[10%] mx-2">
                    <p className="text-center text-gray-500">→</p>
                </div>
                <div className="flex flex-col gap-y-2 w-[45%]">
                    <select
                    >
                    </select>
                    <select
                        className="px-2 py-1 border rounded w-40 text-sm"
                    >
                    </select>
                </div>
            </div>

            <div className="pt-4">
                <button
                    onClick={onClose}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};

export default FormPrefill;