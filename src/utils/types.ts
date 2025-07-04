export interface GraphNode {
    id: string;
    hidden: boolean;
    type: string;
    position: { x: number; y: number };
    data: {
        name: string;
        component_type: string;
        [key: string]: any;
    };
}

export interface GraphEdge {
    source: string;
    target: string;
}

export interface GraphBranch {
    id: string;
    name: string;
    description: string;
    created_at: string;
    created_by: string;
}

export interface GraphForm {
    id: string;
    name: string;
    description: string;
    is_reusable: boolean;
    field_schema: {
        type: string;
        properties: Record<
            string,
            {
                avantos_type: string;
                type: string;
                title?: string;
                format?: string;
                items?: any;
                enum?: any;
            }
        >;
        required?: string[];
    };
    ui_schema?: any;
    dynamic_field_config?: Record<
        string,
        {
            selector_field: string;
            payload_fields: Record<
                string,
                {
                    type: string;
                    value: string;
                }
            >;
            endpoint_id: string;
        }
    >;
}


export interface GraphResponse {
    blueprint_id: string;
    blueprint_name: string;
    version_id: string;
    version_number: string;
    status: string;
    tenant_id: string;
    nodes: GraphNode[];
    edges: GraphEdge[];
    branches: GraphBranch[];
    forms: GraphForm[];
}

export interface FormWithDependencies {
    id: string;
    name: string;
    prerequisites: string[];
}

export interface FormFieldPrefillRow {
    formName: string;
    formId: string;
    fieldName: string;
    prefillFrom?: {
        formName: string;
        field: string;
    };
}

export interface FormOption {
  formId: string;
  formName: string;
  fields: string[];
}