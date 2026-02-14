export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    status: "Listed" | "Delisted";
}

// 2. Define the types of Actions allowed in the header
export type ActionType = "TableHeading" | "MainAction" | "DropdownAction";

export interface TableAction {
    id: string;
    type: ActionType;
    displayText: string;
    actionModal?: React.ComponentType<{ action: TableAction }>;
    onClickFunction?: (data?: any) => Promise<any> | void;
}

// 3. Define the paginated response structure from your API
export interface PaginatedResponse<T> {
    content: T[];
    number: number;      // Current page from backend
    size: number;        // Page size
    totalPages: number;
    totalElements: number;
}

// 4. Define the overall Table State
export type TableKey = "attributes" | "categories" | "products" | "attributesValues";

export interface TableState {
    activeTable: TableKey;
    filterId: string | number | null;
    currentData: {
        content: any[]; // We use any[] here because the slice holds different types over time
        page: number;
        size: number;
        totalPages: number;
        totalElements: number;
        loading: boolean;
        error: string | null;
    };
}