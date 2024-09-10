import React, {FC, useEffect, useState} from 'react';
import './Header.css';
import DesktopHeader from '@/components/UI/header/desktop/DesktopHeader';
import MobileHeader from '@/components/UI/header/mobile/MobileHeader';
import {useUserStore} from '@/store/useUserStore';
import {headerLinks} from '@/utils/headerLinks';
import {useNavigate} from 'react-router-dom';
import {RouteNames} from '@/router';

const Header: FC = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
    const [searchQuery, setSearchQuery] = useState('');

    const {user} = useUserStore();
    const routes = headerLinks(user);
    const navigate = useNavigate();

    const isMobileHandler = () => setIsMobile(window.innerWidth < 1000);
    const search = () => {
        navigate(RouteNames.SHOP + `?search=${searchQuery}`);
    };

    useEffect(() => {
        window.addEventListener('resize', isMobileHandler);

        return () => {
            window.removeEventListener('resize', isMobileHandler);
        };
    }, [window.outerWidth]);

    return isMobile ?
        <MobileHeader
            routes={routes}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            search={search}
        />
        :
        <DesktopHeader
            routes={[
                routes[1],
                routes[2]
            ]}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            search={search}
        />
        ;
};

export default Header;