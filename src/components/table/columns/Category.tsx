import { type ColumnDef } from "@tanstack/react-table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../../ui/dropdown-menu"
import { Button } from "../../ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Checkbox } from "../../ui/checkbox"
import type { TableAction } from "@/types/tableTypes"
import type { Category } from "@/types/categoryTypes"
import NewCategoryDialog from "../dialog/NewCategoryDialog"


export const categoryColumns: ColumnDef<Category>[] = [
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
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "parentName",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Parent
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "level",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Level
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const category = row.original

            return (
                <CategoryActionsCell category={category} />
            )
        },
    },
]

const CategoryActionsCell = ({ category }: { category: Category }) => {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(category.id.toString())}>
                    Copy attribute Id
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(category.parentId?.toString() || "")}>
                    Copy parent Id
                </DropdownMenuItem>
                <DropdownMenuSeparator />

                <DropdownMenuItem>Edit</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export const categoryTableAction: TableAction[] = [
    {
        id: "header",
        type: "TableHeading",
        displayText: "Categories",
        onClickFunction: () => { }
    },
    {
        id: "mainAction",
        type: "MainAction",
        displayText: "New",
        actionModal: NewCategoryDialog,

    },
]




