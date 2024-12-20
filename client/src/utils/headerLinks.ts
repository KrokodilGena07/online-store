import {INavItem} from '@/models/UI/INavItem';
import {RouteNames} from '@/router';
import CartIcon from '@/assets/svg/navIcons/cart.svg';
import AuthIcon from '@/assets/svg/navIcons/auth.svg';
import {IUser} from '@/models/user/IUser';

export function headerLinks(user: IUser): INavItem[] {
    const isAdmin = user?.role === 'ADMIN';

    return [
        {
            path: RouteNames.HOME,
            title: 'Home'
        },
        {
            path: RouteNames.CART,
            title: 'Cart',
            icon: CartIcon
        },
        {
            path: user ? RouteNames.PROFILE : RouteNames.AUTH_LOGIN,
            title: user ? 'Profile' : 'Sign in',
            icon: AuthIcon
        },
        isAdmin && {
            path: RouteNames.ADMIN_PANEL,
            title: 'Admin'
        }
    ].filter(Boolean);
}