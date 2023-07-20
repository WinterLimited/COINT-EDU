// src/components/Logout.tsx
import React from 'react';
import {useDispatch} from 'react-redux';
import {logout} from '../../redux/authSlice';

const Logout: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <button onClick={() => dispatch(logout())}>Logout</button>
    );
};

export default Logout;
