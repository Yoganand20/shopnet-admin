// // components/table/DataTablePagination.tsx
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

// interface PaginationProps {
//     page: number;
//     size: number;
//     totalPages: number;
//     onPageChange: (page: number) => void;
//     onPageSizeChange: (size: number) => void;
// }

// export function DataTablePagination({ page, size, totalPages, onPageChange, onPageSizeChange }: PaginationProps) {
//     return (
//         <div className="flex items-center space-x-6 lg:space-x-8 justify-between p-4 border-t">
//             <div className="flex items-center space-x-2">
//                 <p className="text-sm font-medium">Rows per page</p>
//                 <Select value={`${size}`} onValueChange={(v) => onPageSizeChange(Number(v))}>
//                     <SelectTrigger className="h-8 w-20">
//                         <SelectValue placeholder={size} />
//                     </SelectTrigger>
//                     <SelectContent side="top">
//                         {[10, 15, 20, 25, 30].map((s) => (
//                             <SelectItem key={s} value={`${s}`}>{s}</SelectItem>
//                         ))}
//                     </SelectContent>
//                 </Select>
//             </div>

//             <div className="text-sm font-medium">
//                 Page {page + 1} of {totalPages}
//             </div>

//             <div className="flex items-center space-x-2">
//                 <Button variant="outline" size="icon" className="size-8" onClick={() => onPageChange(0)} disabled={page === 0}>
//                     <ChevronsLeft className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="icon" className="size-8" onClick={() => onPageChange(page - 1)} disabled={page === 0}>
//                     <ChevronLeft className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="icon" className="size-8" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages - 1}>
//                     <ChevronRight className="h-4 w-4" />
//                 </Button>
//                 <Button variant="outline" size="icon" className="size-8" onClick={() => onPageChange(totalPages - 1)} disabled={page >= totalPages - 1}>
//                     <ChevronsRight className="h-4 w-4" />
//                 </Button>
//             </div>
//         </div>
//     );
// }

// // export function DataTablePagination() {
// //     const dispatch = useDispatch<AppDispatch>();
// //     const { page, size, totalPages } = useSelector((state: RootState) => state.table.currentData);

// //     return (
// //         <div className="flex items-center space-x-6 lg:space-x-8 justify-between p-4 border-t">
// //             {/* Page size selector */}
// //             <div className="flex items-center space-x-2">
// //                 <p className="text-sm font-medium">Rows per page</p>
// //                 <Select
// //                     value={`${size}`}
// //                     onValueChange={(value) => dispatch(setPageSize(Number(value)))}
// //                 >
// //                     <SelectTrigger className="h-8 w-17.5">
// //                         <SelectValue placeholder={size} />
// //                     </SelectTrigger>
// //                     <SelectContent side="top">
// //                         {[10, 15, 20, 25, 30].map((pageSize) => (
// //                             <SelectItem key={pageSize} value={`${pageSize}`}>
// //                                 {pageSize}
// //                             </SelectItem>
// //                         ))}
// //                     </SelectContent>
// //                 </Select>
// //             </div>

// //             {/* Page info */}
// //             <div className="flex w-25 items-center justify-center text-sm font-medium">
// //                 Page {page + 1} of {totalPages}
// //             </div>

// //             <div className="flex items-center space-x-2">
// //                 <Button
// //                     variant="outline"
// //                     size="icon"
// //                     className="hidden size-8 lg:flex"
// //                     onClick={() => dispatch(setPage(0))}
// //                     disabled={page === 0}
// //                 >
// //                     <ChevronsLeft className="h-4 w-4" />
// //                 </Button>
// //                 <Button
// //                     variant="outline"
// //                     size="icon"
// //                     className="size-8"
// //                     onClick={() => dispatch(setPage(page - 1))}
// //                     disabled={page === 0}
// //                 >
// //                     <ChevronLeft className="h-4 w-4" />
// //                 </Button>
// //                 <Button
// //                     variant="outline"
// //                     size="icon"
// //                     className="size-8"
// //                     onClick={() => dispatch(setPage(page + 1))}
// //                     disabled={page >= totalPages - 1}
// //                 >
// //                     <ChevronRight className="h-4 w-4" />
// //                 </Button>
// //                 <Button
// //                     variant="outline"
// //                     size="icon"
// //                     className="hidden size-8 lg:flex"
// //                     onClick={() => dispatch(setPage(totalPages - 1))}
// //                     disabled={page >= totalPages - 1}
// //                 >
// //                     <ChevronsRight className="h-4 w-4" />
// //                 </Button>
// //             </div>
// //         </div>
// //     );
// // }


interface PaginationProps {
    page: number;
    size: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPageSizeChange: (size: number) => void;
}

export function DataTablePagination({ page, size, totalPages, onPageChange, onPageSizeChange }: PaginationProps) {
    return (
        <div className="flex items-center justify-between p-4 border-t">
            <div className="flex items-center gap-2">
                <p className="text-sm font-medium">Rows per page</p>
                <Select value={`${size}`} onValueChange={(v) => onPageSizeChange(Number(v))}>
                    <SelectTrigger className="h-8 w-20">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {[10, 20, 30].map(s => <SelectItem key={s} value={`${s}`}>{s}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            {/* Page info */}
            <div className="flex w-25 items-center justify-center text-sm font-medium">
                Page {page + 1} of {totalPages}
            </div>

            <div className="flex items-center space-x-2">
                <Button
                    variant="outline"
                    size="icon"
                    className="hidden size-8 lg:flex"
                    onClick={() => onPageChange(0)}
                    disabled={page === 0}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 0}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="size-8"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page >= totalPages - 1}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="hidden size-8 lg:flex"
                    onClick={() => onPageChange(totalPages - 1)}
                    disabled={page >= totalPages - 1}
                >
                    <ChevronsRight className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
}