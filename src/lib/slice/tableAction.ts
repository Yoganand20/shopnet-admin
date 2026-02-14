import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { createAttributeApi, createCategoryApi, deleteAttributeApi, deleteCategoryApi, getAllAttributeValuesApi, getAttributesApi, getAttributeValuesByIdApi, getCategoriesApi, removeValuesFromAttributeApi } from '../api/apiClient';
import type { PaginatedResponse } from '@/types/tableTypes';
import { toast } from 'sonner';

const isValidNumberId = (id: any): id is number => {
    return typeof id === 'number' && !isNaN(id) && id > 0;
};

export const fetchTableData = createAsyncThunk<
    PaginatedResponse<any>,
    void,
    { state: RootState; rejectValue: string }
>(
    "table/fetchData",
    async (_, { getState, rejectWithValue }) => {
        const state = getState() as RootState;
        const { activeTable, currentData, filterId } = state.table;
        const { page, size } = currentData;

        try {
            let response;

            switch (activeTable) {
                case "attributes":
                    response = await getAttributesApi(page, size);
                    break;
                case "attributesValues":
                    if (filterId && isValidNumberId(filterId)) {
                        response = await getAttributeValuesByIdApi(filterId)
                    }
                    else
                        response = await getAllAttributeValuesApi(page, size);
                    break;
                case "categories":
                    response = await getCategoriesApi(page, size);
                    break;
                default:
                    return rejectWithValue("Unknown table type");
            }

            // 'response.data' now matches PaginatedResponse<T>
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Data fetch failed");
        }
    }
);


export const createData = createAsyncThunk<
    any,
    any, // The payload (e.g., CreateAttributeRequest or CategoryRequest)
    { state: RootState; rejectValue: string }
>(
    "table/createData",
    async (payload, { getState, rejectWithValue }) => {
        const { activeTable } = (getState() as RootState).table;

        try {
            let response;
            switch (activeTable) {
                case "attributes":
                    response = await createAttributeApi(payload);
                    toast.success("Attribute Created Successfully")

                    break;
                case "categories":
                    response = await createCategoryApi(payload);
                    toast.success("Category Created Successfully")
                    break;
                // Add cases for products, users, etc.
                default:
                    return rejectWithValue("Creation not supported for this table");
            }
            return response.data;
        } catch (err: any) {
            toast.error(err.response?.data?.message);
            return rejectWithValue(err.response?.data?.message || "Creation failed");
        }
    }
);

export const removeData = createAsyncThunk<
    number | string, // Returns the ID of the removed item
    any, // The payload needed for deletion
    { state: RootState; rejectValue: string }
>(
    "table/removeData",
    async (payload, { getState, rejectWithValue }) => {
        const { activeTable } = (getState() as RootState).table;

        try {
            switch (activeTable) {
                case "attributes":
                    await deleteAttributeApi(payload.id);
                    return payload.id;

                case "attributesValues":
                    // Specialized logic for attribute values
                    await removeValuesFromAttributeApi(payload.attributeId, { values: [payload.value] });
                    return payload.id; // Unique row ID

                case "categories":
                    await deleteCategoryApi(payload.id);
                    return payload.id;

                default:
                    return rejectWithValue("Deletion not supported for this table");
            }
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || "Deletion failed");
        }
    }
);
