import React from "react";
import styles from './Header.module.css';
import logo from './Frame.svg';
import lalasiaLogo from './Lalasia.svg';
import bag from './bag-2.svg';
import userSvg from './user.svg';

const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.logoContainer}>
                <img src={logo} alt='logo' className={styles.logo} />
                <img src={lalasiaLogo} alt='Lalasia' className={styles.logo} />
            </div>
            <nav className={styles.headerNav}>
                <ul>
                    <li><a href="/products">Products</a></li>
                    <li><a href="/categories">Categories</a></li>
                    <li><a href="/about">About us</a></li>
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