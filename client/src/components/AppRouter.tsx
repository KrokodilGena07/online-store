import React, {FC} from 'react';
import {Route, Routes} from 'react-router-dom';
import {useUserStore} from '@/store/useUserStore';
import {adminRoutes, privateRoutes, publicRoutes} from '@/router';

const AppRouter: FC = () => {
    const {user} = useUserStore();
    const baseRoutes = user ? privateRoutes : publicRoutes;
    const isAdmin = user?.role === 'ADMIN';
    const routes = isAdmin ? baseRoutes.concat(adminRoutes) : baseRoutes;

    return (
        <Routes>
            {routes.map(route =>
                <Route
                    path={route.path}
                    element={route.element}
                    key={route.path}
                />
            )}
        </Routes>
    );
};

export default AppRouter;