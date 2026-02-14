// import { MoreVertical } from 'lucide-react'
// import { Button } from '../ui/button'
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
// import { DataTable } from './DataTable'
// import type { ColumnDef } from '@tanstack/react-table'
// import type { TableAction } from '@/types/tableTypes'
// import { DataTablePagination } from './DataTablePagination'
// import { setPage, setPageSize } from '@/lib/slice/tableSlice'
// import { useEffect, useMemo } from 'react'
// import { TABLE_CONFIGS } from './tableConfig'
// import { useDispatch, useSelector } from 'react-redux'
// import type { AppDispatch, RootState } from '@/lib/store'
// import { fetchTableData } from '@/lib/slice/tableAction'

import type { TableAction } from "@/types/tableTypes";
import { Button } from "../ui/button";
import { DataTable } from "./DataTable";
import { DataTablePagination } from "./DataTablePagination";
import type { ColumnDef } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { MoreVertical } from "lucide-react";

// // interface TablePageProp<TData, TValue> {
// //     actions: TableAction[],
// //     columns: ColumnDef<TData, TValue>[]
// //     data: TData[]
// // }

// // function TablePage<TData, TValue>({ actions, columns, data }: TablePageProp<TData, TValue>) {
// //     const tableHeading = actions.find(({ type }) => type === "TableHeading");
// //     const mainAction = actions.find(({ type }) => type === "MainAction");

// //     return (
// //         <div className='flex flex-col h-full'>
// //             <header className="flex justify-between items-center mb-4">
// //                 <h1 className="text-3xl font-bold">{tableHeading?.displayText}</h1>
// //                 <div className="flex flex-row gap-2 items-center">
// //                     {/* */}
// //                     {mainAction?.actionModal ? (
// //                         <mainAction.actionModal action={mainAction} />
// //                     ) : (
// //                         mainAction && <Button onClick={mainAction.onClickFunction}>{mainAction.displayText}</Button>
// //                     )}
// //                     <DropdownMenu>
// //                         <DropdownMenuTrigger asChild className="h-8 w-8 p-0">
// //                             <Button variant="ghost" className="h-8 w-8 p-0">
// //                                 <span className="sr-only">Open menu</span>
// //                                 <MoreVertical className="h-4 w-4" />
// //                             </Button>
// //                         </DropdownMenuTrigger>
// //                         <DropdownMenuContent align="end">
// //                             {actions.map((action) => {
// //                                 if (action.type === "DropdownAction") {
// //                                     return (
// //                                         <DropdownMenuItem key={action.id} onClick={() => { return action?.onClickFunction?.() }}>
// //                                             {action.displayText}
// //                                         </DropdownMenuItem>
// //                                     )
// //                                 }
// //                             })}
// //                         </DropdownMenuContent>
// //                     </DropdownMenu>
// //                 </div>
// //             </header>
// //             <div className='flex-1 min-h-0'>
// //                 <DataTable
// //                     columns={columns}
// //                     data={data}
// //                 />
// //                 <DataTablePagination />
// //             </div>
// //         </div>
// //     );
// // }

// function TablePage() {
//     const dispatch = useDispatch<AppDispatch>();

//     // 1. Grab everything needed from Redux
//     const { activeTable, currentData } = useSelector((state: RootState) => state.table);
//     const { content, page, size, totalPages, loading } = currentData;

//     // 2. Fetch data on dependency changes
//     useEffect(() => {
//         dispatch(fetchTableData());
//     }, [dispatch, activeTable, page, size]);

//     // 3. Get UI Config
//     const config = TABLE_CONFIGS[activeTable];

//     // 4. Memoize action filtering for performance
//     const { tableHeading, mainAction, dropdownActions } = useMemo(() => ({
//         tableHeading: config.actions.find(({ type }) => type === "TableHeading"),
//         mainAction: config.actions.find(({ type }) => type === "MainAction"),
//         dropdownActions: config.actions.filter(({ type }) => type === "DropdownAction")
//     }), [config.actions]);

//     return (
//         <div className={`flex flex-col h-full p-6 transition-opacity ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
//             <header className="flex justify-between items-center mb-4">
//                 <h1 className="text-3xl font-bold">{tableHeading?.displayText}</h1>
//                 <div className="flex flex-row gap-2 items-center">
//                     {mainAction?.actionModal ? (
//                         <mainAction.actionModal action={mainAction} />
//                     ) : (
//                         mainAction && <Button onClick={mainAction.onClickFunction}>{mainAction.displayText}</Button>
//                     )}

//                     {dropdownActions.length > 0 && (
//                         <DropdownMenu>
//                             <DropdownMenuTrigger asChild>
//                                 <Button variant="ghost" size="icon" className="h-8 w-8">
//                                     <MoreVertical className="h-4 w-4" />
//                                 </Button>
//                             </DropdownMenuTrigger>
//                             <DropdownMenuContent align="end">
//                                 {dropdownActions.map((action) => (
//                                     <DropdownMenuItem key={action.id} onClick={() => action.onClickFunction?.()}>
//                                         {action.displayText}
//                                     </DropdownMenuItem>
//                                 ))}
//                             </DropdownMenuContent>
//                         </DropdownMenu>
//                     )}
//                 </div>
//             </header>

//             <div className='flex-1 min-h-0'>
//                 <DataTable 
//                     columns={config.columns} 
//                     data={content} 
//                 />
//                 <DataTablePagination 
//                     page={page}
//                     size={size}
//                     totalPages={totalPages}
//                     onPageChange={(p) => dispatch(setPage(p))}
//                     onPageSizeChange={(s) => dispatch(setPageSize(s))}
//                 />
//             </div>
//         </div>
//     );
// }
// export default TablePage


interface TablePageProps<TData, TValue> {
    title: string;
    actions: TableAction[];
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    isLoading: boolean;
    pagination: {
        page: number;
        size: number;
        totalPages: number;
        onPageChange: (p: number) => void;
        onPageSizeChange: (s: number) => void;
    };
}

export default function TablePage<TData, TValue>(props: TablePageProps<TData, TValue>) {
    const { title, actions, columns, data, isLoading, pagination } = props;

    const mainAction = actions.find(a => a.type == "MainAction");
    const dropdownActions = actions.filter(a => a.type == "DropdownAction");

    return (
        <div className={`flex flex-col h-full p-6 transition-opacity ${isLoading ? "opacity-50 pointer-events-none" : ""}`}>
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">{title}</h1>
                <div className="flex items-center gap-2">
                    {mainAction?.actionModal ? (
                        <mainAction.actionModal action={mainAction} />
                    ) : (
                        mainAction && <Button onClick={mainAction.onClickFunction}>{mainAction.displayText}</Button>
                    )}
                    {dropdownActions.length > 0 && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {dropdownActions.map((action) => (
                                    <DropdownMenuItem key={action.id} onClick={() => action.onClickFunction?.()}>
                                        {action.displayText}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
            </header>

            <div className="flex-1 min-h-0">
                <DataTable columns={columns} data={data} />
                <DataTablePagination {...pagination} />
            </div>
        </div>
    );
}