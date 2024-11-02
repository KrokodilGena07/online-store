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
import EyeIcon from '@/assets/svg/eyeIcons/eyeIcon.svg';
import EyeOffIcon from '@/assets/svg/eyeIcons/eyeOffIcon.svg';

const Auth: FC = () => {
    const [newUser, setNewUser] = useState<IUserInput>({
        username: '', email: '', password: ''
    });
    const [errors, setErrors] = useState<IError[] | null>(null);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isPassword, setIsPassword] = useState(true);

    const {
        registration,
        login,
        isLoading
    } = useAuthStore();

    const setUser = useUserStore(state => state.setUser);
    const navigate = useNavigate();

    const isLogin = location.pathname === RouteNames.AUTH_LOGIN;
    const authorize = isLogin ? login : registration;

    const inputError = (fieldName: string): IError | undefined => {
        return errors?.find(error => error.path === fieldName);
    };

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
        className='auth-page__form-link-text'
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
                            className='auth-page__form-label'
                        >
                            Username
                        </label>
                        <Input
                            value={newUser.username}
                            onChange={v => newUserHandler(v, 'username')}
                            id='username'
                            size='lg'
                            className={inputError('username') && 'auth-page__form-input_wrong'}
                        />
                        {!!inputError('username') &&
                            <span className='auth-page__form-error-text'>{inputError('username').msg}</span>
                        }
                    </>
                }
                <label
                    htmlFor="email"
                    className='auth-page__form-label'
                >
                    Email
                </label>
                <Input
                    value={newUser.email}
                    type='email'
                    onChange={v => newUserHandler(v, 'email')}
                    id='email'
                    size='lg'
                    className={inputError('email') && 'auth-page__form-input_wrong'}
                />
                {!!inputError('email') &&
                    <span className='auth-page__form-error-text'>{inputError('email').msg}</span>
                }
                <label
                    htmlFor="password"
                    className='auth-page__form-label'
                >
                    Password
                </label>
                <div className='auth-page__form-password'>
                    <Input
                        value={newUser.password}
                        type={isPassword ? 'password' : 'text'}
                        onChange={v => newUserHandler(v, 'password')}
                        id='password'
                        size='lg'
                        className={(inputError('password') && 'auth-page__form-input_wrong') + ' auth-page__form-password-input'}
                    />
                    <div>
                        <Button
                            variant='icon'
                            onClick={() => setIsPassword(!isPassword)}
                            type='button'
                        >
                            {isPassword ?
                                <EyeIcon className='auth-page__form-eye-icon'/>
                                :
                                <EyeOffIcon className='auth-page__form-eye-icon'/>
                            }
                        </Button>
                    </div>
                </div>
                {!!inputError('password') &&
                    <span className='auth-page__form-error-text'>{inputError('password').msg}</span>
                }
                {!errors &&
                    <span className='auth-page__form-error'>{errorMessage}</span>
                }
                <div className='auth-page__form-button'>
                    <Button
                        variant='primary'
                    >
                        {isLoading ? 'Loading...' : 'Send'}
                    </Button>
                </div>
                <span className='auth-page__form-link'>
                    Click {link} to {isLogin ? 'sign up' : 'sign in'}
                </span>
            </form>
        </div>
    );
};

export default Auth;