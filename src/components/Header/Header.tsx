import styles from './Header.module.scss';
import logo from 'assets/images/Frame.svg';
import lalasiaLogo from 'assets/images/Lalasia.svg';
import bag from 'assets/images/bag-2.svg';
import userSvg from 'assets/images/user.svg';
import HeaderNav from 'components/HeaderNav/HeaderNav';
import { useNavigate } from 'react-router';
import { routes } from 'config/routes.config';
import cartStore from 'store/CartStore';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

const Header = observer(() => {
    const navigate = useNavigate();
    const goToCart = () => {
        navigate(routes.cart.create());
    }
    const goToCatalog = () => {
        navigate(routes.main.create());
    }

    const user = localStorage.getItem('userEmail');
    const logout = () => {
        localStorage.removeItem('userEmail')
        navigate(routes.login.create());

    };
    useEffect(() => {
        cartStore.getItemsFromStorage();
    }, [])

    const goToLogin = () => navigate(routes.login.create())
    return (
        <div className={styles.container}>
            <div className={styles.containerMaxWidth}>
                <div className={styles.logoContainer} onClick={goToCatalog}>
                    <img src={logo} alt='logo' className={styles.logo} />
                    <img src={lalasiaLogo} alt='Lalasia' className={styles.logoLala} />
                </div>

                <HeaderNav />

                <div className={styles.userInfoContainer}>
                    <div className={styles.bag}>
                        <img src={bag} alt='bag' className={styles.userInfo} onClick={goToCart} />
                        {cartStore.totalItems > 0 &&
                            <div className={styles.inBag}>{cartStore.totalItems}</div>}
                    </div>
                    {user ?
                        <div className={styles.minTextSize} onClick={logout}><p>Logout</p></div>
                        : <img src={userSvg} alt='userSvg' className={styles.userInfo} onClick={goToLogin} />
                    }
                </div>

            </div>
        </div>
    )
});

export default Header;