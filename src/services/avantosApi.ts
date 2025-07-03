import type { GraphResponse } from '../utils/types';

export async function GetActionBlueprintGraph(): Promise<GraphResponse> {
  const action_blueprint_id = 'bp_456';
  const blueprint_version_id = 'bpv_123';
  const tenant_id = '123';

  const url = `http://localhost:3000/api/v1/${tenant_id}/actions/blueprints/${action_blueprint_id}/graph`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json, application/problem+json',
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error: ${res.status} - ${errorText}`);
  }

  return await res.json();
}