import React, {FC, useEffect, useState} from 'react';
import './Auth.css';
import {RouteNames} from '@/router';
import Input from '@/components/UI/input/Input';
import Button from '@/components/UI/button/Button';
import {Link, useNavigate} from 'react-router-dom';
import {useLoginStore} from '@/store/auth/useLoginStore';
import {AxiosError} from 'axios';
import {useRegistrationStore} from '@/store/auth/useRegistrationStore';
import {IUserInput} from '@/models/user/IUserInput';
import {IErrorData} from '@/models/error/IErrorData';
import {IError} from '@/models/error/IError';
import {useUserStore} from '@/store/useUserStore';

const Auth: FC = () => {
    const [newUser, setNewUser] = useState<IUserInput>({
        username: '', email: '', password: ''
    });
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [errors, setErrors] = useState<IError[] | null>(null);

    const {isLoading: lL} = useLoginStore();
    const {isLoading: rL} = useRegistrationStore();

    const login = useLoginStore(state => state.login);
    const registrate = useRegistrationStore(state => state.registration);

    const setUser = useUserStore(state => state.setUser);
    const navigate = useNavigate();

    const isLogin = location.pathname === RouteNames.AUTH_LOGIN;
    const isLoading = lL || rL;
    const authorize = isLogin ? login : registrate;

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
        setErrorMessage(null);
        await authorize(newUser)
            .then(data => {
                setUser(data);
                navigate(RouteNames.HOME);
            })
            .catch((error: AxiosError<IErrorData>) => {
                if (error.code === 'ERR_NETWORK') {
                    setErrorMessage('Looks like something went wrong');
                    return;
                }
                const data = error.response.data;
                if (!data?.errors) {
                    setErrorMessage(data.message);
                }
                setErrors(data.errors);
            })
    };

    useEffect(() => {
        setNewUser({username: '', email: '', password: ''});
        setErrorMessage(null);
        setErrors(null);
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
                            <span className='auth-page__form-field-error'>{inputError('username').msg}</span>
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
                    <span className='auth-page__form-field-error'>{inputError('email').msg}</span>
                }
                <label
                    htmlFor="password"
                    className='auth-page__form-label'
                >
                    Password
                </label>
                <Input
                    value={newUser.password}
                    type='password'
                    onChange={v => newUserHandler(v, 'password')}
                    id='password'
                    size='lg'
                    className={inputError('password') && 'auth-page__form-input_wrong'}
                />
                {!!inputError('password') &&
                    <span className='auth-page__form-field-error'>{inputError('password').msg}</span>
                }
                {errorMessage &&
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