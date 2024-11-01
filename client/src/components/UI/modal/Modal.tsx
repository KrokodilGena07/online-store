import React, {FC} from 'react';
import './Modal.css';

interface ModalProps {
    children: React.ReactNode;
    isVisible: boolean;
    setIsVisible: (isVisible: boolean) => void;
}

const Modal: FC<ModalProps> = ({children, isVisible, setIsVisible}) => {
    if (isVisible) {
        return (
            <div
                className='modal center-container'
                onClick={() => setIsVisible(false)}
            >
                <div
                    className='modal__children'
                    onClick={e => e.stopPropagation()}
                >
                    {children}
                </div>
            </div>
        );
    }
};

export default Modal;