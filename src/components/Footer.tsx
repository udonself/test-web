import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import logo from '../images/logo.svg';
import tiktokLogo from '../images/tiktok.svg';
import twitterLogo from '../images/twitter.svg';
import instagramLogo from '../images/instagram.svg';
import '../css/Footer.css';


function Footer() {

    return (
      <div className="footer-wrapper">
        <div className="footer container">
            <div className="footer__column">
              <span className="footer__list-title">TaskLink</span>
              <ul className='footer__colum-list'>
                <li><Link target='_blank' to=''>О сервисе</Link></li>
                <li><Link target='_blank' to=''>Услуги и цены</Link></li>
                <li><Link target='_blank' to=''>Контакты</Link></li>
              </ul>
            </div>
            <div className="footer__column">
              <span className="footer__list-title">Помощь</span>
              <ul className='footer__colum-list'>
                <li><Link target='_blank' to=''>Для фрилансера</Link></li>
                <li><Link target='_blank' to=''>Для работодателя</Link></li>
                <li><Link target='_blank' to=''>Служба поддержки</Link></li>
              </ul>
            </div>
            <div className="footer__column">
              <span className="footer__list-title">Документы</span>
              <ul className='footer__colum-list'>
                <li><Link target='_blank' to=''>Соглашение с пользователем</Link></li>
                <li><Link target='_blank' to=''>Правила оказания услуг</Link></li>
                <li><Link target='_blank' to=''>Политика конфиденциальности</Link></li>
              </ul>
            </div>
            <div className="footer__column">
              <ul className='footer__colum-list social-list'>
                <li><Link target='_blank' to='https://www.instagram.com/ilya_jshhh/'><img className='social-icon' src={instagramLogo} alt="" /></Link></li>
                <li><Link target='_blank' to='https://twitter.com/elonmusk'><img className='social-icon' src={twitterLogo} alt="" /></Link></li>
                <li><Link target='_blank' to='https://www.tiktok.com/@elonmuskdaily'><img className='social-icon' src={tiktokLogo} alt="" /></Link></li>
              </ul>
            </div>
        </div>
      </div>
    );
  }
  
  export default Footer;
