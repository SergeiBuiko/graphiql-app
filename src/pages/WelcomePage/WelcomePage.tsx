import styles from './WelcomePage.module.css';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';

export function WelcomePage() {
  const isAuth = useAppSelector((state) => state.authentication.userEmail);

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.infoWrapper}>
          <h2 className={styles.title}>
            {!isAuth
              ? 'Get started by creating an account or logging in'
              : 'Welcome back! Your session is active'}
          </h2>
          <p className={styles.subtitle}>
            Let&apos;s get started with the GraphiQL App
          </p>
        </div>

        {!isAuth ? (
          <div className={styles.buttonsWrapper}>
            <Link to={`/account?auth=sign-in`} className={styles.linkButton}>
              <Button text={'Sign In'} />
            </Link>
            <Link to={`/account?auth=sign-up`} className={styles.linkButton}>
              <Button text={'Sign Up'} />
            </Link>
          </div>
        ) : (
          <Link to={`/GraphiQL`} className={styles.linkButton}>
            <Button text={'Go To Editor'} />
          </Link>
        )}
      </div>
    </div>
  );
}
