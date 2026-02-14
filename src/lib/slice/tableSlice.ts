import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TableState, TableKey } from "@/types/tableTypes";
import { createData, fetchTableData, removeData } from "./tableAction";

const initialState: TableState = {
    activeTable: "attributes",
    filterId: null,
    currentData: {
        content: [],
        page: 0,
        size: 10,
        totalPages: 0,
        totalElements: 0,
        loading: false,
        error: null,
    },
};

export const tableSlice = createSlice({
    name: "table",
    initialState,
    reducers: {
        // action.payload is now strictly "attributes" | "categories" | "products" |"attributesValues"
        setActiveTable: (state, action: PayloadAction<{ key: TableKey; filterId?: string | number }>) => {
            state.activeTable = action.payload.key;
            state.filterId = action.payload.filterId ?? null;
            state.currentData.page = 0;
            state.currentData.content = [];
            state.currentData.error = null;
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.currentData.page = action.payload;
        },
        setPageSize: (state, action: PayloadAction<number>) => {
            state.currentData.size = action.payload;
            state.currentData.page = 0;
        },
    },
    extraReducers: (builder) => {
        //fetch
        builder
            .addCase(fetchTableData.pending, (state) => {
                state.currentData.loading = true;
            })
            .addCase(fetchTableData.fulfilled, (state, action) => {
                state.currentData.loading = false;
                // action.payload is typed as PaginatedResponse<any>
                state.currentData.content = action.payload.content;
                state.currentData.totalPages = action.payload.totalPages;
                state.currentData.totalElements = action.payload.totalElements;
            })
            .addCase(fetchTableData.rejected, (state, action) => {
                state.currentData.loading = false;
                state.currentData.error = action.payload ?? "An error occurred";
            });

        //delete
        builder
            .addCase(removeData.fulfilled, (state, action) => {
                state.currentData.content = state.currentData.content.filter(
                    (item: any) => item.id !== action.payload
                );
                state.currentData.totalElements -= 1;
            });

        //create
        builder
            .addCase(createData.pending, (state) => {
                state.currentData.loading = true;
            })
            .addCase(createData.fulfilled, (state, action) => {
                state.currentData.loading = false;
                // Add the new item to the top of the list
                state.currentData.content = [action.payload, ...state.currentData.content];
                state.currentData.totalElements += 1;
            })
            .addCase(createData.rejected, (state, action) => {
                state.currentData.loading = false;
                state.currentData.error = action.payload ?? "Failed to create";
            })
    },
});

export const { setActiveTable, setPage, setPageSize } = tableSlice.actions;
export default tableSlice.reducer;