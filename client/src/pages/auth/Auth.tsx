import React, {FC, useEffect, useState} from 'react';
import './Auth.css';
import {RouteNames} from '@/router';
import Input from '@/components/UI/input/Input';
import Button from '@/components/UI/button/Button';
import {Link, useNavigate} from 'react-router-dom';
import {IUserInput} from '@/models/user/IUserInput';
import {IError} from '@/models/error/IError';
import {useUserStore} from '@/store/useUserStore';
import {AxiosError} from 'axios';
import {IErrorData} from '@/models/error/IErrorData';
import {useAuthStore} from '@/store/auth/useAuthStore';
import {useFindInputError} from '@/hooks/useFindInputError';

const Auth: FC = () => {
    const [newUser, setNewUser] = useState<IUserInput>({
        username: '', email: '', password: ''
    });
    const [errors, setErrors] = useState<IError[] | null>(null);
    const [errorMessage, setErrorMessage] = useState(null);

    const {
        registration,
        login,
        isLoading
    } = useAuthStore();

    const setUser = useUserStore(state => state.setUser);
    const navigate = useNavigate();

    const isLogin = location.pathname === RouteNames.AUTH_LOGIN;
    const authorize = isLogin ? login : registration;

    const inputError = useFindInputError(errors);

    const newUserHandler = (value: string, field: string) => {
        if (errors) {
            setErrors(errors.filter(error => error.path !== field));
        }
        setNewUser({...newUser, [field]: value});
    };

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await authorize(newUser)
            .then(data => {
                if (data) {
                    setUser(data);
                    navigate(RouteNames.HOME);
                }
            })
            .catch(err => {
                const errorData = (err as AxiosError<IErrorData>).response.data;
                if (!errorData.errors) {
                    setErrorMessage(errorData.message);
                }
                setErrors(errorData.errors);
            })
    };

    useEffect(() => {
        setNewUser({username: '', email: '', password: ''});
        setErrors(null);
        setErrorMessage(null);
    }, [location.pathname]);

    const link = <Link
        to={isLogin ? RouteNames.AUTH_REGISTRATION : RouteNames.AUTH_LOGIN}
        className='auth-page__link-text'
    >
        here
    </Link>;

    return (
        <div className='auth-page center-container'>
            <form
                className='auth-page__form'
                onSubmit={e => submit(e)}
            >
                {!isLogin &&
                    <>
                        <label
                            htmlFor="username"
                            className='auth-page__label'
                        >
                            Username
                        </label>
                        <Input
                            value={newUser.username}
                            onChange={v => newUserHandler(v, 'username')}
                            id='username'
                            size='lg'
                            isInvalid={!!inputError('username')}
                            error={inputError('username')}
                        />
                    </>
                }
                <label
                    htmlFor="email"
                    className='auth-page__label'
                >
                    Email
                </label>
                <Input
                    value={newUser.email}
                    type='email'
                    onChange={v => newUserHandler(v, 'email')}
                    id='email'
                    size='lg'
                    isInvalid={!!inputError('email')}
                    error={inputError('email')}
                />
                <label
                    htmlFor="password"
                    className='auth-page__label'
                >
                    Password
                </label>
                <Input
                    value={newUser.password}
                    type='password'
                    onChange={v => newUserHandler(v, 'password')}
                    id='password'
                    size='lg'
                    isInvalid={!!inputError('password')}
                    error={inputError('password')}
                    className='auth-page__password-input'
                />
                {!errors &&
                    <span className='auth-page__error'>{errorMessage}</span>
                }
                <div className='auth-page__button'>
                    <Button
                        variant='primary'
                    >
                        {isLoading ? 'Loading...' : 'Send'}
                    </Button>
                </div>
                <span className='auth-page__link'>
                    Click {link} to {isLogin ? 'sign up' : 'sign in'}
                </span>
            </form>
        </div>
    );
};

export default Auth;