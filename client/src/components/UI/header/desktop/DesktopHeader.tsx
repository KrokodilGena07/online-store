import React, {FC, useState} from 'react';
import './DesktopHeader.css';
import {Link} from 'react-router-dom';
import {RouteNames} from '@/router';
import logo from '@/assets/images/logo.png';
import {INavItem} from '@/models/INavItem';
import Button from '@/components/UI/button/Button';
import Input from '@/components/UI/input/Input';
import Search from '@/assets/svg/search.svg';

interface DesktopHeaderProps {
    routes: INavItem[];
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    search: () => void;
}

const DesktopHeader: FC<DesktopHeaderProps> = props => {
    return (
        <header  className='header desktop-header'>
            <Link
                to={RouteNames.HOME}
                className='desktop-header__logo'
            >
                <img
                    src={logo}
                    alt="logo"
                    width={65}
                />
                <p className='desktop-header__logo-text'>
                    online-store
                </p>
            </Link>
            <div className='header-search'>
                <Input
                    value={props.searchQuery}
                    onChange={props.setSearchQuery}
                    size='lg'
                    className='header-search__input'
                />
                <Button
                    variant='icon'
                    onClick={props.search}
                >
                    <Search className='header-search__icon'/>
                </Button>
            </div>
            <nav className='desktop-header__navbar'>
                {props.routes.map(route =>
                    <Link
                        to={route.path}
                        key={route.path}
                    >
                        <Button variant='icon'>
                            <route.icon
                                className='desktop-header__navbar-item-icon'
                            />
                        </Button>
                    </Link>
                )}
            </nav>
        </header>
    );
};

export default DesktopHeader;