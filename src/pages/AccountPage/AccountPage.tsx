import { SignUp } from '../../components/common/LoginFormModal/SignUp';
import { SignIn } from '../../components/common/LoginFormModal/SignIn';
import { useLocation } from 'react-router-dom';
import styles from './AccountPage.module.css';

export function AccountPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const auth = queryParams.get('auth');

  return (
    <div className={styles.accountWrapper}>
      <div className={styles.formWrapper}>
        <div>
          <p className={styles.subtitle}>
            {auth === 'sign-in' ? ' Welcome back!' : 'Create account!'}
          </p>
          <p className={styles.title}>
            {auth === 'sign-in'
              ? 'Sign in to your account'
              : 'Sign up to your account'}
          </p>
        </div>
        {auth === 'sign-in' ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
}
