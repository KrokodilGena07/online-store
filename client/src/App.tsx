import React, {FC, Suspense, useEffect} from 'react';
import './styles/index.css';
import AppRouter from '@/components/AppRouter';
import Header from '@/components/UI/header/Header';
import Loader from '@/components/UI/loader/Loader';
import {useRefresh} from '@/store/auth/useRefresh';
import {useUserStore} from '@/store/useUserStore';
import {useAuthStore} from '@/store/auth/useAuthStore';

const App: FC = () => {
    const {data, error, isLoading} = useRefresh();

    const refresh = useRefresh(state => state.refresh);
    const {logout} = useAuthStore();

    const {setUser, removeUser} = useUserStore();

    useEffect(() => {
        refresh();
    }, []);

    useEffect(() => {
        if (error?.status === 401) {
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