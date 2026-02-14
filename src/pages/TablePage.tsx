import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { fetchTableData } from "@/lib/slice/tableAction";
import { setPage, setPageSize } from "@/lib/slice/tableSlice";
import { TABLE_CONFIGS } from "../components/table/tableConfig";
import TablePage from "../components/table/TableContainer";

export default function MainTableContainer() {
    const dispatch = useDispatch<AppDispatch>();
    const { activeTable, currentData } = useSelector((state: RootState) => state.table);

    useEffect(() => {
        dispatch(fetchTableData());
    }, [dispatch, activeTable, currentData.page, currentData.size]);

    const config = TABLE_CONFIGS[activeTable];

    return (
        <TablePage

            title={config.actions.find(a => a.type === "TableHeading")?.displayText || "Table"}
            actions={config.actions}
            columns={config.columns}
            data={currentData.content}
            isLoading={currentData.loading}

            pagination={{
                page: currentData.page,
                size: currentData.size,
                totalPages: currentData.totalPages,
                onPageChange: (p) => dispatch(setPage(p)),
                onPageSizeChange: (s) => dispatch(setPageSize(s)),
            }}
        />
    );
}