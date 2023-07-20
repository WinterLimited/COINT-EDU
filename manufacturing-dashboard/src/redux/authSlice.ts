// src/redux/authSlice.ts
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const initialState: AuthState = {
    token: null,
    isAuthenticated: false,
    isLoading: true, // isLoading 추가
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // login action - id, password를 받아서 서버에 로그인 요청을 보낸다.
        login(state, action: PayloadAction<{ id: string; password: string }>) {
            const {id, password} = action.payload;
            if (id === 'admin' && password === 'admin') {
                // 로그인 성공 시 token을 받아온다고 가정하고 token을 저장
                state.token = 'test_token';
                state.isAuthenticated = true;

                // 로그인 성공 시 localStorage에 token을 저장
                localStorage.setItem('token', state.token);

                // redirect to index
                window.location.href = '/';
            }
        },
        logout(state) {
            state.token = null;
            state.isAuthenticated = false;
        },
        setAuth(state, action: PayloadAction<boolean>) {
            state.isAuthenticated = action.payload;
        },
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
    },
});

export const {login, logout, setAuth, setLoading} = authSlice.actions;

export default authSlice.reducer;
