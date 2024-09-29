import React, {FC, Suspense, useEffect} from 'react';
import './styles/index.css';
import AppRouter from '@/components/AppRouter';
import Header from '@/components/UI/header/Header';
import Loader from '@/components/UI/loader/Loader';
import {useRefreshStore} from '@/store/auth/useRefreshStore';
import {useUserStore} from '@/store/useUserStore';
import {useLogoutStore} from '@/store/auth/useLogoutStore';

const App: FC = () => {
    const {data, error, isLoading} = useRefreshStore();

    const refresh = useRefreshStore(state => state.refresh);
    const logout = useLogoutStore(state => state.logout);

    const {setUser, removeUser} = useUserStore();

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        if (error?.response?.status === 401) {
            logout();
            removeUser();
        }
        if (data) {
            setUser(data);
        }
    }, [data, error]);

    if (isLoading) {
        return <Loader/>;
    }

    return (
        <div className='App'>
            <Suspense fallback={<Loader/>}>
                <Header/>
                <AppRouter/>
            </Suspense>
        </div>
    );
};

export default App;