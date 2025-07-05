import { useEffect, useState } from "react";
import type { FormFieldPrefillRow } from "../utils/types";
import { getUpstreamFormsWithFields } from "../utils/graph";

type FormPrefillPorps = {
    row: FormFieldPrefillRow;
    onClose: () => void;
};

const FormPrefill = ({ row, onClose }: FormPrefillPorps) => {
    const [upstreamForms, setUpstreamForms] = useState<
        { id: string; name: string; fields: string[] }[]
    >([]);

    const [selectedFormId, setSelectedFormId] = useState<string | undefined>();
    const [selectedField, setSelectedField] = useState<string | undefined>();

    useEffect(() => {
        const forms = getUpstreamFormsWithFields(row.formId);
        setUpstreamForms(forms);

        if (row.prefillFrom) {
            const matchedForm = forms.find(f => f.name === row.prefillFrom?.formName);

            if (matchedForm) {
                setSelectedFormId(matchedForm.id);
                setSelectedField(row.prefillFrom.field);
            }
        } else {
            setSelectedFormId(undefined);
            setSelectedField(undefined);
        }
    }, [row.formId, row.prefillFrom]);


    const availableFields =
        upstreamForms.find(f => f.id === selectedFormId)?.fields || [];

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
                        className="px-2 py-1 border rounded w-full"
                        value={selectedFormId}
                        onChange={(e) => {
                            setSelectedFormId(e.target.value);
                            setSelectedField(undefined);
                        }}
                        disabled={upstreamForms.length === 0}
                    >
                        <option value="">Select form</option>
                        {upstreamForms.map((form) => (
                            <option key={form.id} value={form.id}>
                                {form.name}
                            </option>
                        ))}
                    </select>
                    <select
                        className="px-2 py-1 border rounded w-full"
                        value={selectedField}
                        onChange={(e) => setSelectedField(e.target.value)}
                        disabled={!selectedFormId}
                    >
                        <option value="">Select field</option>
                        {availableFields.map((field) => (
                            <option key={field} value={field}>
                                {field}
                            </option>
                        ))}
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