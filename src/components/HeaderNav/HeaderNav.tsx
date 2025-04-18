import { Link } from 'react-router';
import styles from './HeaderNav.module.scss';
import { routes } from 'config/routes.config';

const HeaderNav = () => {
    return (
        <nav className={styles.headerNav}>
        <ul>
            <li><Link to={routes.main.create()}>Products</Link></li>
            <li><Link to={routes.categories.create()}>Categories</Link></li>
            <li><Link to={routes.about.create()}>About us</Link></li>
        </ul>
    </nav>

    )
}

export default HeaderNav;