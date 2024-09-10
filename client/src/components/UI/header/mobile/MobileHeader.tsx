import React, {FC, useEffect, useState} from 'react';
import './MobileHeader.css';
import {Link, useLocation} from 'react-router-dom';
import {RouteNames} from '@/router';
import logo from '@/assets/images/logo.png';
import Button from '@/components/UI/button/Button';
import Menu from '@/assets/svg/menu.svg';
import Close from '@/assets/svg/close.svg';
import {INavItem} from '@/models/INavItem';
import Input from '@/components/UI/input/Input';
import Search from '@/assets/svg/search.svg';

interface MobileHeaderProps {
    routes: INavItem[];
    searchQuery: string;
    setSearchQuery: (value: string) => void;
    search: () => void;
}

const MobileHeader: FC<MobileHeaderProps> = props => {
    const [isOpen, setIsOpen] = useState(false);

    const root = document.getElementById('root');
    const location = useLocation();

    const isHiddenHandler = () => {
        setIsOpen(!isOpen);
        root.className = isOpen ? '' : 'root_freeze';
    };

    useEffect(() => {
        setIsOpen(false);
        root.className = '';
    }, [location.pathname]);

    return (
        <header className='header'>
            <div className='mobile-header__panel'>
                <Link
                    to={RouteNames.HOME}
                >
                    <img
                        src={logo}
                        alt="logo"
                        className='mobile-header__panel-logo'
                    />
                </Link>
                <div className='header-search'>
                    <Input
                        value={props.searchQuery}
                        onChange={props.setSearchQuery}
                        size='md'
                        className='header-search__input'
                    />
                    <Button
                        variant='icon'
                        onClick={props.search}
                    >
                        <Search className='header-search__icon'/>
                    </Button>
                </div>
                <Button
                    variant='icon'
                    onClick={isHiddenHandler}
                >
                    {isOpen ?
                        <Close className='mobile-header__panel-button-icon'/>
                        :
                        <Menu className='mobile-header__panel-button-icon'/>
                    }
                </Button>
            </div>
            {isOpen &&
                <nav className='mobile-header__menu'>
                    {props.routes.map(route =>
                        <Link
                            to={route.path}
                            className='mobile-header__menu-item'
                            key={route.path}
                        >
                            {route.title}
                        </Link>
                    )}
                </nav>
            }
        </header>
    );
};

export default MobileHeader;