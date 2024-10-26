import React from 'react';

export interface INavItem {
    path: string;
    title: string;
    icon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>
}