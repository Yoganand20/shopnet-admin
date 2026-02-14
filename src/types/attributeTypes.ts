// 1. Define specific entity interfaces 
export interface Attribute {
    id: number;
    type: string;
    desc?: string;
    values: string[];
    createdAt?: string;
    updatedAt?: string;
}

export interface CreateAttributeRequest {
    type: string;
    desc?: string;
    values?: string[];
}

export interface UpdateAttributeRequest {
    type?: string;
    desc?: string;
}

export interface UpdateAttributeValueRequest {
    values: string[];
}

export interface AttributeValue {
    id: number;
    value: string;
    attributeId: number;
    attributeType: string;
}