import styles from './Header.module.scss';
import logo from 'assets/images/Frame.svg';
import lalasiaLogo from 'assets/images/Lalasia.svg';
import bag from 'assets/images/bag-2.svg';
import userSvg from 'assets/images/user.svg'
import HeaderNav from 'components/HeaderNav';
import React from 'react';


const Header = () => {
    return (
        <div className={styles.container}>
            <div className={styles.containerMaxWidth}>
                <div className={styles.logoContainer}>
                    <img src={logo} alt='logo' className={styles.logo} />
                    <img src={lalasiaLogo} alt='Lalasia' className={styles.logoLala} />
                </div>
                
                <HeaderNav />

                <div className={styles.userInfoContainer}>
                    <img src={bag} alt='bag' className={styles.userInfo} />
                    <img src={userSvg} alt='userSvg' className={styles.userInfo} />
                </div>

            </div>
        </div>
    )
}

export default Header;