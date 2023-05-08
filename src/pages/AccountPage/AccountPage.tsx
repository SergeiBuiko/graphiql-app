import { SignUp } from '../../components/common/LoginFormModal/SignUp';
import { SignIn } from '../../components/common/LoginFormModal/SignIn';
import { useLocation } from 'react-router-dom';
import styles from './AccountPage.module.css';
import translate from './../../i18n/translate';

export function AccountPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const auth = queryParams.get('auth');

  return (
    <div className={styles.accountWrapper}>
      <div className={styles.formWrapper}>
        <div>
          <p className={styles.subtitle}>
            {auth === 'sign-in'
              ? translate('accountPageSubtitleSignIn')
              : translate('accountPageSubtitleSignUp')}
          </p>
          <p className={styles.title}>
            {auth === 'sign-in'
              ? translate('accountPageTitleSignIn')
              : translate('accountPageTitleSignUp')}
          </p>
        </div>
        {auth === 'sign-in' ? <SignIn /> : <SignUp />}
      </div>
    </div>
  );
}
