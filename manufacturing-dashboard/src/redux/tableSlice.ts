import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AppThunk, RootState} from './store';

type TableState<T extends { id_num: number }> = {
    data: T[];
    loading: boolean;
    error: string | null;
    editingData: { [id: number]: T }; // id를 key로 하고, 수정 중인 row 데이터를 value로 하는 객체
};

const initialState: TableState<any> = {
    data: [],
    loading: false,
    error: null,
    editingData: {}, // 초기 상태
};

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {
        startEditing: <T extends { id_num: number }>(state: TableState<any>, action: PayloadAction<any>) => {
            state.editingData[action.payload.id_num] = action.payload;
        },
        stopEditing: (state: TableState<any>, action: PayloadAction<number>) => {
            delete state.editingData[action.payload];
        },
        updateRowSuccess: <T extends { id_num: number }>(state: TableState<T>, action: PayloadAction<T>) => {
            state.data = state.data.map((row: T) => {
                if (row.id_num === action.payload.id_num) {
                    return action.payload;
                }
                return row;
            });
            delete state.editingData[action.payload.id_num]; // Update was successful, clear the editing data for this id
            state.loading = false;
            state.error = null;
        },
        updateRowError: (state: TableState<any>, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {startEditing, stopEditing, updateRowSuccess, updateRowError} = tableSlice.actions;

export const updateRow = <T extends { id_num: number }>(
    id: number,
    updatedRow: T,
    apiLink: string // 동적으로 받아온 API 링크
): AppThunk<Promise<void>> => async (dispatch) => {
    dispatch(updateRowStart());
    try {
        // PATCH 요청 또는 데이터 업데이트 로직을 수행합니다.
        // 예를 들어:
        // const response = await yourAPIService.updateRow(apiLink, id, updatedRow);
        // dispatch(updateRowSuccess<T>(response.data));
    } catch (error) {
        // 에러를 처리합니다.
        // dispatch(updateRowError(error.message));
    }
};

const updateRowStart = () => {
    return {
        type: 'table/updateRowStart',
        payload: null,
    };
};


export default tableSlice.reducer;
