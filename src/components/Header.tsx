import React from 'react';
import { Link } from 'react-router-dom';
import { useState, useEffect} from 'react';

import AuthForm from './AuthForm';
import logo from '../images/logo.svg';
import menuIcon from '../images/menu.svg';
import closeIcon from '../images/close-nav.svg'
import '../css/Header.css';

interface DropNavbarProps {
    setOpenStatus: (status: boolean) => void;
    handleProfileButtonClick: () => void;
}

const DropNavbar: React.FC<DropNavbarProps> = ({setOpenStatus, handleProfileButtonClick}) => {
    const closeMenu = () => {
        setOpenStatus(false);
    }
    return (
        <div className="mobile-navbar-wrapper">
            <img src={closeIcon} alt="" className="close-menu-icon" onClick={closeMenu}/>
            <div className="mobile-navbar">
                <ul className='header__navlist mobile-navlist'>
                    <li>
                        <Link to='/tasks' onClick={closeMenu}>Заказы</Link>
                    </li>
                    <li>
                        <Link to='/freelancers' onClick={closeMenu}>Исполнители</Link>
                    </li>
                    <li>
                        <Link to='/messages'>Сообщения</Link>
                    </li>
                </ul>
                <span className="profile-button" onClick={() => {closeMenu(); handleProfileButtonClick()}}>
                    Профиль
                </span>
            </div>
        </div>
    )
}


function Header() {
    const [authFormOpened, setAuthFormOpened] = useState<boolean>(false);
    const [mobileNavbarOpened, setMobileNavbarOpened] = useState<boolean>();
    const [mobile, setMobile] = useState<boolean>(false);

    const handleResize = () => {
        const windowWidth = window.innerWidth;
        if (windowWidth <= 876) {
            setMobile(true);
            return;
        }
        setMobile(false);
        setMobileNavbarOpened(false);
      };
      
    window.addEventListener('resize', handleResize);

    const handleProfileBtnClick = () => {
        setAuthFormOpened(true);
    }

    useEffect(() => {
        handleResize();
    }, []);

    return (
      <div className="header-wrapper">
        {
            authFormOpened
            ? 
                <AuthForm setAuthFormOpened={setAuthFormOpened}/>
            :
                ''
        }
        {
            mobileNavbarOpened 
            ? 
                <DropNavbar setOpenStatus={setMobileNavbarOpened} handleProfileButtonClick={handleProfileBtnClick}/>
            :
                ''
        }
        <div className="header container">
            <Link to='/'>
                <img src={logo} className="logo" alt="logo task link" />
            </Link>
            {mobile ?
                 <img src={menuIcon} alt="" onClick={() => setMobileNavbarOpened(true)}/>
            : 
            <div className='navbar'>
                <ul className='header__navlist'>
                    <li>
                        <Link to='/tasks'>Заказы</Link>
                    </li>
                    <li>
                        <Link to='/freelancers'>Исполнители</Link>
                    </li>
                    <li>
                        <Link to='/messages'>Сообщения</Link>
                    </li>
                </ul>
                <span className="profile-button" onClick={handleProfileBtnClick}>
                    Профиль
                </span>
            </div>
            }
            
        </div>
      </div>
    );
  }
  
  export default Header;
  