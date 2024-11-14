import React, {FC} from 'react';
import './Profile.css';
import {useUserStore} from '@/store/useUserStore';
import Button from '@/components/UI/button/Button';
import {Link, useNavigate} from 'react-router-dom';
import {RouteNames} from '@/router';
import {useAuthStore} from '@/store/auth/useAuthStore';

const Profile: FC = () => {
    const {user, removeUser} = useUserStore();
    const {logout, isLoading} = useAuthStore();

    const navigate = useNavigate();
    const isAdmin = user?.role === 'ADMIN';

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
                <h1>{user.username}</h1>
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
                {isAdmin &&
                    <>
                        <Link to='/admin/redactor/new'>
                            <Button
                                size='lg'
                                variant='primary'
                            >
                                Create new product
                            </Button>
                        </Link>
                        <Link to={RouteNames.ADMIN_PANEL}>
                            <Button
                                size='lg'
                            >
                                Admin
                            </Button>
                        </Link>
                    </>
                }
                <Button
                    size='lg'
                    onClick={signOut}
                >
                    {isLoading ? 'Loading...' : 'Logout'}
                </Button>
            </div>
        </div>
    );
};

export default Profile;