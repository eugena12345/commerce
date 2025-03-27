//import React from "react";
import styles from './Header.module.css';
import logo from 'assets/images/Frame.svg';
import lalasiaLogo from 'assets/images/Lalasia.svg';
import bag from 'assets/images/bag-2.svg';
import userSvg from 'assets/images/user.svg';

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img src={logo} alt='logo' className={styles.logo} />
                <img src={lalasiaLogo} alt='Lalasia' className={styles.logo} />
            </div>
            <nav className={styles.headerNav}>
                <ul>
                    <li><a href="#">Products</a></li>
                    <li><a href="#">Categories</a></li>
                    <li><a href="#">About us</a></li>
                </ul>
            </nav>

            <div className={styles.userInfoContainer}>
            <img src={bag} alt='bag' className={styles.userInfo} />
            <img src={userSvg} alt='userSvg' className={styles.userInfo} />
            </div>
        </div>
    )
}

export default Header;