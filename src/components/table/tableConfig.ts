import type { ColumnDef } from "@tanstack/react-table";
import type { TableKey, TableAction } from "@/types/tableTypes";

// Component/Column Imports
import { attributeColumns, attributeTableAction } from "@/components/table/columns/Attribute";
import { categoryColumns, categoryTableAction } from "@/components/table/columns/Category";
import { attributeValueColumns, attributeValueTableAction } from "./columns/AttributeValue";

interface ConfigEntry {
    columns: ColumnDef<any, any>[];
    actions: TableAction[];
}

export const TABLE_CONFIGS: Record<TableKey, ConfigEntry> = {
    attributes: {
        columns: attributeColumns,
        actions: attributeTableAction,
    },
    categories: {
        columns: categoryColumns,
        actions: categoryTableAction,
    },
    products: {
        columns: categoryColumns,
        actions: [
            { id: "h1", type: "TableHeading", displayText: "Products", onClickFunction: () => { } }
        ],
    },
    attributesValues: {
        columns: attributeValueColumns,
        actions: attributeValueTableAction,
    },
};