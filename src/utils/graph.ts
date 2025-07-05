import type { FormFieldPrefillRow, GraphResponse } from "./types";

let cachedGraph: GraphResponse;

export function setGraph(graph: GraphResponse) {
  cachedGraph = graph;
}

export function getFormFieldsWithPrefill(graph: GraphResponse): FormFieldPrefillRow[] {
  const { forms, nodes, edges } = graph;

  const formIdToNodeId = new Map<string, string>();
  const nodeIdToFormId = new Map<string, string>();
  for (const node of nodes) {
    if (node.type === 'form') {
      const formId = node.data.component_id;
      formIdToNodeId.set(formId, node.id);
      nodeIdToFormId.set(node.id, formId);
    }
  }

  const formIdToName = new Map(forms.map(f => [f.id, f.name]));

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

    visited.delete(startNodeId);
    return visited;
  }

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

          for (const sourceFormId of upstreamFormIds) {
            const sourceForm = forms.find(f => f.id === sourceFormId);
            if (sourceForm?.field_schema?.properties?.[originField]) {
              row.prefillFrom = {
                formName: formIdToName.get(sourceFormId) ?? 'Unknown',
                field: originField,
              };
              break;
            }
          }
        }
      }

      rows.push(row);
    }
  }

  return rows;
}


export function getUpstreamFormsWithFields(formId: string): { id: string; name: string; fields: string[] }[] {
  if (!cachedGraph) return [];

  const { forms, nodes, edges } = cachedGraph;

  const formIdToNodeId = new Map<string, string>();
  const nodeIdToFormId = new Map<string, string>();
  for (const node of nodes) {
    if (node.type === 'form') {
      const formId = node.data.component_id;
      formIdToNodeId.set(formId, node.id);
      nodeIdToFormId.set(node.id, formId);
    }
  }

  const nodeId = formIdToNodeId.get(formId);
  if (!nodeId) return [];

  // Encontrar nodos antecesores
  const visited = new Set<string>();
  const stack = [nodeId];
  while (stack.length > 0) {
    const current = stack.pop();
    if (!current || visited.has(current)) continue;
    visited.add(current);

    const upstream = edges
      .filter(e => e.target === current)
      .map(e => e.source);

    stack.push(...upstream);
  }

  visited.delete(nodeId); // quitar el nodo actual

  // Mapear los nodos antecesores a formularios válidos con sus campos
  const upstreamForms = Array.from(visited)
    .map(nid => nodeIdToFormId.get(nid))
    .filter((id): id is string => Boolean(id))
    .map(formId => {
      const form = forms.find(f => f.id === formId);
      if (!form) return null;
      const fields = Object.keys(form.field_schema?.properties || {});
      return {
        id: form.id,
        name: form.name,
        fields
      };
    })
    .filter((f): f is { id: string; name: string; fields: string[] } => f !== null);

  return upstreamForms;
}