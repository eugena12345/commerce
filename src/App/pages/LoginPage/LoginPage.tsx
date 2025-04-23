import { useFormik } from 'formik';
import styles from './LoginPage.module.scss';
import { useNavigate } from 'react-router';
import { routes } from 'config/routes.config';

const LoginPage = () => {
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        onSubmit: (values) => {
            localStorage.setItem('userEmail', values.email);
            navigate(routes.cart.create());
        },
    });
    return (
        <div className={styles.container}>
            <div className={styles['container--withMax']}>
                <form className={styles.form} onSubmit={formik.handleSubmit}>
                    <label htmlFor="email">Email Address</label>
                    <input className={styles.element}
                        id="email"
                        name="email"
                        type="email"
                        placeholder='type email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                    />
                    <label htmlFor="password">Password</label>
                    <input className={styles.element}
                        id="password"
                        name="password"
                        type="password"
                        placeholder='type password'

                        onChange={formik.handleChange}
                        value={formik.values.password}
                    />

                    <button type="submit">Submit</button>
                </form>


            </div>

        </div>
    )
}

export default LoginPage;