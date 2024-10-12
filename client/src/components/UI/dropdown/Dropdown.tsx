import React, {FC, useEffect, useRef, useState} from 'react';
import './Dropdown.css';
import {IDropdownItem} from '@/models/IDropdownItem';
import DropdownIcon from '@/assets/svg/dropdownIcon.svg';

interface DropdownProps {
    value: any;
    onChange: (value: any) => void;
    options: IDropdownItem[];
    variant?: 'primary' | 'default';
    className?: string;
    defaultValue?: string;
}

const Dropdown: FC<DropdownProps> = props => {
    const selectedStyle = `dropdown__menu-icon_${props.variant || 'default'}_selected`;
    const [isOpen, setIsOpen] = useState(false);

    const optionHandler = (opt: string) => {
        props.onChange(opt);
        setIsOpen(!isOpen);
    };

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as HTMLElement)) {
                setIsOpen(false);
            }
        }

        if (isOpen) {
            window.addEventListener('click', close);
        }

        return () => {
            window.removeEventListener('click', close);
        }
    }, [isOpen]);

    const dropdownHandler = () => setIsOpen(!isOpen);

    const dropdownTitle = props.options?.find(opt => opt.value === props.value)?.title;

    return (
        <div
            className={`dropdown ${props.className}`}
            onClick={dropdownHandler}
            ref={ref}
        >
            <div
                className={`dropdown__head dropdown_${props.variant || 'default'}`}
            >
                <div>{dropdownTitle || props.defaultValue || 'not selected'}</div>
                <DropdownIcon className='dropdown__head-icon'/>
            </div>
            {isOpen &&
                <div className='dropdown__menu'>
                    {!props.options.length &&
                        <div className='dropdown__menu-no-data'>
                            No data
                        </div>
                    }
                    {props.options.map(option =>
                        <div
                            key={option.value}
                            onClick={() => optionHandler(option.value)}
                            className={`dropdown__menu-icon ${option.value === props.value && selectedStyle}`}
                        >
                            {option.title}
                        </div>
                    )}
                </div>
            }
        </div>
    );
};

export default Dropdown;