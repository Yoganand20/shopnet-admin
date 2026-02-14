import { type ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { Button } from "../../ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "../../ui/checkbox"
import type { Attribute } from "@/types/attributeTypes"
import type { TableAction } from "@/types/tableTypes"
import { useDispatch } from "react-redux"
import { setActiveTable } from "@/lib/slice/tableSlice"
import type { AppDispatch } from "@/lib/store"
import NewAttributeDialog from "../dialog/NewAttributeDialog"


export const attributeColumns: ColumnDef<Attribute>[] = [
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
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Type
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Description
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const attribute = row.original

            return (
                <AttributeActionsCell attribute={attribute} />
            )
        },
    },
]

const AttributeActionsCell = ({ attribute }: { attribute: Attribute }) => {
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
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(attribute.id.toString())}>
                    Copy attribute ID
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                {/* 3. Add the onClick handler with dispatch */}
                <DropdownMenuItem onClick={() => dispatch(setActiveTable({
                    key: "attributesValues", // Ensure this matches your TableKey type
                    filterId: attribute.id   // Pass the ID to filter the values
                }))}>
                    View all Values
                </DropdownMenuItem>

                <DropdownMenuItem>Edit</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const attributeTableAction: TableAction[] = [
    {
        id: "header",
        type: "TableHeading",
        displayText: "Attributes",
        onClickFunction: () => { }
    },
    {
        id: "mainAction",
        type: "MainAction",
        displayText: "New",
        actionModal: NewAttributeDialog,

    },
]




