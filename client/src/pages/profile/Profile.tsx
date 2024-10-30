import React, {FC} from 'react';
import './Profile.css';
import {useUserStore} from '@/store/useUserStore';
import Button from '@/components/UI/button/Button';
import {Link, useNavigate} from 'react-router-dom';
import {RouteNames} from '@/router';
import {useLogoutStore} from '@/store/auth/useLogoutStore';

const Profile: FC = () => {
    const {user, removeUser} = useUserStore();
    const logout = useLogoutStore(state => state.logout);

    const navigate = useNavigate();

    const signOut = () => {
        logout();
        removeUser();
        navigate(RouteNames.HOME);
    };

    return (
        <div className='profile-page page'>
            <div>
                {!user.isActivated &&
                    <div className='profile-page__warning'>
                        <p>Activate your email, please!</p>
                    </div>
                }
                <h1 className='profile-page__username'>{user.username}</h1>
                <p className='profile-page__email'>
                    Email: <span className='profile-page__email-text'>{user.email}</span>
                </p>
            </div>
            <div className='profile-page__buttons'>
                <Link to={RouteNames.CART}>
                    <Button
                        variant='primary'
                        size='lg'
                    >
                        Cart
                    </Button>
                </Link>
                <Link to={RouteNames.ADMIN_PANEL}>
                    <Button
                        size='lg'
                    >
                        Admin
                    </Button>
                </Link>
                <Button
                    size='lg'
                    onClick={signOut}
                >
                    Logout
                </Button>
            </div>
        </div>
    );
};

export default Profile;