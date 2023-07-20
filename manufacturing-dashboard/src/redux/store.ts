// src/redux/store.ts
import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tableReducer from './tableSlice';

// AppThunk라는 타입을 만들어서 사용
// AppTHunk: redux-thunk 미들웨어를 사용하기 위한 타입, 비동기 액션을 생성하는 함수에서 반환하는 액션 객체의 타입을 정확하게 표현가능


export const store = configureStore({
    reducer: {
        auth: authReducer,
        table: tableReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
