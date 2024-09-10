import React, {FC, Suspense} from 'react';
import './styles/index.css';
import AppRouter from '@/components/AppRouter';
import Header from '@/components/UI/header/Header';
import Loader from '@/components/UI/loader/Loader';

const App: FC = () => {
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