import { type ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { Button } from "../../ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "../../ui/checkbox"
import type { AttributeValue } from "@/types/attributeTypes"
import type { TableAction } from "@/types/tableTypes"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/lib/store"
import { removeData } from "@/lib/slice/tableAction"


export const attributeValueColumns: ColumnDef<AttributeValue>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "id",
        header: "Id"
    },
    {
        accessorKey: "attributeType",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Attribute Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "value",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Value
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const attributeValue = row.original

            return (
                <AttributeValueActionsCell attributeValue={attributeValue} />
            )
        },
    },
]

const AttributeValueActionsCell = ({ attributeValue }: { attributeValue: AttributeValue }) => {
    const dispatch = useDispatch<AppDispatch>();
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(attributeValue.attributeId.toString())}>
                    Copy attribute  ID
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(attributeValue.id.toString())}>
                    Copy attribute value ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                    dispatch(removeData({
                        attributeId: attributeValue.attributeId,
                        value: attributeValue.value,
                        id: attributeValue.id
                    }));
                }}>
                    Remove Value from attribute
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const attributeValueTableAction: TableAction[] = [
    {
        id: "header",
        type: "TableHeading",
        displayText: "Attribute - Values",
        onClickFunction: () => { }
    },
]
