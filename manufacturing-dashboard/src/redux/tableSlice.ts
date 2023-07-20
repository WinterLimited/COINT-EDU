import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {RootState, AppThunk} from './store';

interface TableState {
    data: any;  // data 타입도 한정할 수 있음
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: TableState = {
    data: [],
    status: 'idle',
    error: null
};

export const fetchData = createAsyncThunk('table/fetchData', async (apiUrl: string) => {
    const response = await axios.get(apiUrl);
    return response.data;
});

const tableSlice = createSlice({
    name: 'table',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
                state.status = 'succeeded';
                // Add the fetched data to the state
                state.data = action.payload;
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown error';
            });


    }
});

export default tableSlice.reducer;
