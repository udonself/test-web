import React from 'react';

import closeIcon from '../images/close-nav.svg';
import '../css/Popup.css';


type PopupProps = {
    isOpen: boolean;
    onClose: () => void;
    children?: React.ReactNode;
};


const Popup: React.FC<PopupProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) {
    return null;
  }

  const handleWrapperClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget){
        onClose();
    }
}

  return (
    <div className="popup" onClick={handleWrapperClick}>
        <div className="popup__window">
            <div className="popup__row popup__right">
                <img className="popup__close-icon right" src={closeIcon} alt="close icon" onClick={onClose}/>
            </div>
            <div className="popup__row popup__content">
                {children}
            </div>
        </div>
    </div>
  );
};

export default Popup;