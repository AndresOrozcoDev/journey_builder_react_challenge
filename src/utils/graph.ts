import type { FormFieldPrefillRow, GraphResponse } from "./types";

export function getFormFieldsWithPrefill(graph: GraphResponse): FormFieldPrefillRow[] {
  const { forms, nodes, edges } = graph;

  // 🔁 Map: formId ↔ nodeId
  const formIdToNodeId = new Map<string, string>();
  const nodeIdToFormId = new Map<string, string>();
  for (const node of nodes) {
    if (node.type === 'form') {
      const formId = node.data.component_id;
      formIdToNodeId.set(formId, node.id);
      nodeIdToFormId.set(node.id, formId);
    }
  }

  // 🧠 Map: formId → form name
  const formIdToName = new Map(forms.map(f => [f.id, f.name]));

  // 🔁 Helper: Recorrer transitivamente los nodos aguas arriba
  function getAllUpstreamNodeIds(startNodeId: string): Set<string> {
    const visited = new Set<string>();
    const stack = [startNodeId];

    while (stack.length > 0) {
      const current = stack.pop();
      if (!current || visited.has(current)) continue;
      visited.add(current);

      const upstream = edges
        .filter(e => e.target === current)
        .map(e => e.source);

      stack.push(...upstream);
    }

    visited.delete(startNodeId); // No incluirse a sí mismo
    return visited;
  }

  // 🛠 Construcción final de la tabla
  const rows: FormFieldPrefillRow[] = [];

  for (const form of forms) {
    const { id: formId, name: formName, field_schema, dynamic_field_config } = form;
    const properties = field_schema?.properties ?? {};
    const config = dynamic_field_config ?? {};
    const nodeId = formIdToNodeId.get(formId);
    if (!nodeId) continue;

    const upstreamNodeIds = getAllUpstreamNodeIds(nodeId);
    const upstreamFormIds = Array.from(upstreamNodeIds)
      .map(nid => nodeIdToFormId.get(nid))
      .filter((id): id is string => Boolean(id));

    for (const fieldName of Object.keys(properties)) {
      const row: FormFieldPrefillRow = {
        formName,
        formId,
        fieldName,
      };

      const fieldConfig = config[fieldName];
      if (fieldConfig?.payload_fields) {
        const prefillFields = Object.values(fieldConfig.payload_fields)
          .filter(p => p.type === 'form_field');

        if (prefillFields.length > 0) {
          const originField = prefillFields[0].value;

          // Buscar en formularios upstream alguno que contenga ese campo
          for (const sourceFormId of upstreamFormIds) {
            const sourceForm = forms.find(f => f.id === sourceFormId);
            if (sourceForm?.field_schema?.properties?.[originField]) {
              row.prefillFrom = {
                formName: formIdToName.get(sourceFormId) ?? 'Unknown',
                field: originField,
              };
              break; // usamos el primero que lo tenga
            }
          }
        }
      }

      rows.push(row);
    }
  }

  return rows;
}
