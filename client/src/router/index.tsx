import {RouteObject} from 'react-router-dom';
import LazyHome from '@/pages/home/LazyHome';
import LazyShop from '@/pages/products/shop/LazyShop';
import LazyProduct from '@/pages/products/product/LazyProduct';
import LazyCart from '@/pages/cart/LazyCart';
import LazyError from '@/pages/error/LazyError';
import LazyAuth from '@/pages/auth/LazyAuth';
import LazyProfile from '@/pages/profile/LazyProfile';
import LazyPanel from '@/pages/admin/panel/LazyPanel';
import LazyRedactor from '@/pages/admin/redactor/LazyRedactor';

export enum RouteNames {
    HOME = '/',
    AUTH_REGISTRATION = '/auth/registration',
    AUTH_LOGIN = '/auth/login',
    SHOP = '/shop',
    PRODUCT = '/products/:id',
    CART = '/cart',
    PROFILE = '/profile',
    ADMIN_PANEL = '/admin/panel',
    ADMIN_REDACTOR = '/admin/redactor/:id'
}

const baseRoutes: RouteObject[] = [
    {path: RouteNames.HOME, element: <LazyHome/>},
    {path: RouteNames.SHOP, element: <LazyShop/>},
    {path: RouteNames.PRODUCT, element: <LazyProduct/>},
    {path: RouteNames.CART, element: <LazyCart/>},
    {path: '*', element: <LazyError/>}
];

export const publicRoutes: RouteObject[] = [
    ...baseRoutes,
    {path: RouteNames.AUTH_REGISTRATION, element: <LazyAuth/>},
    {path: RouteNames.AUTH_LOGIN, element: <LazyAuth/>}
];

export const privateRoutes: RouteObject[] = [
    ...baseRoutes,
    {path: RouteNames.PROFILE, element: <LazyProfile/>}
];

export const adminRoutes: RouteObject[] = [
    {path: RouteNames.ADMIN_PANEL, element: <LazyPanel/>},
    {path: RouteNames.ADMIN_REDACTOR, element: <LazyRedactor/>}
];