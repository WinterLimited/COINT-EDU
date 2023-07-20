import React, {useEffect} from 'react';
import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import Login from './components/Login';
import ResponsiveDrawer from './components/ResponsiveDrawer';
// import Dashboard from './components/Dashboard';
import {RootState} from './redux/store';
import {setAuth, setLoading} from "./redux/authSlice";
import {CircularProgress} from "@mui/material";
import Dashboard from "./components/Dashboard";
import SampleTable from "./components/SampleTable";  // Assuming that the RootState is the type of the whole redux state

const ProtectedRoute: React.FC = () => {
    const dispatch = useDispatch();
    const {isAuthenticated, isLoading} = useSelector((state: RootState) => state.auth); // isLoading 추가

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            dispatch(setAuth(true));
        }

        dispatch(setLoading(false)); // 인증 상태 확인 후 isLoading을 false로 설정
    }, [dispatch]);

    // 사용자 인증을 처리하고 있는 동안 Loading 표시
    // 사용자 인증이 완료되면 인증된 사용자에게만 Outlet을 표시
    // 인증되지 않은 사용자는 로그인 페이지로 리디렉션
    return isLoading ? <CircularProgress/> : (isAuthenticated ? (<Outlet/>) : <Navigate to="/login" replace/>);
};


const App: React.FC = () => {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/" element={<ProtectedRoute/>}>
                    <Route element={<ResponsiveDrawer/>}>
                        <Route path="/" element={<div></div>}/>
                        <Route path="/dashboard" element={<Dashboard/>}/>
                        <Route path="/sampletable" element={<SampleTable/>}/>
                    </Route>
                    {/* other protected routes go here */}
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default App;
