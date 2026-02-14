export interface CategoryRequest {
    name: string;
    parentId?: number | null;
}

export interface Category {
    id: number;
    name: string;
    parentId: number | null;
    parentName: string | null;
    level:number;
}