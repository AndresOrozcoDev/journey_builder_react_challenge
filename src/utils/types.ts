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
    created_at: string;
    created_by: string;
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
