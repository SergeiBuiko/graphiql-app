import { Link, useNavigate } from 'react-router-dom';
import '../../assets/Logo.png';
import { signOut } from 'firebase/auth';
import styles from './Navigation.module.css';
import { Button } from '../common/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { auth } from '../../firebaseClient/clientApp';
import { setUserEmail } from '../../store/slices/AuthenticationSlice';
import translate from './../../i18n/translate';
import { useIntl } from 'react-intl';

export function Navigation() {
  const isAuth = useAppSelector((state) => state.authentication.userEmail);
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const navigate = useNavigate();
  const queryParams = location.pathname.includes('/GraphiQL');

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUserEmail({ userEmail: null }));
        navigate('/');
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const buttonSignIn = intl.formatMessage({
    id: 'navigationBtnSighIn',
  });
  const buttonSignUp = intl.formatMessage({
    id: 'navigationBtnSighUp',
  });
  const buttonSignOut = intl.formatMessage({
    id: 'navigationBtnSignOut',
  });

  return (
    <nav
      className={`${styles.navigation} ${
        isAuth && queryParams ? styles.sticky : ''
      }`}
    >
      <a href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md">
        <img className={styles['logo-main']} src="Logo.png"></img>
      </a>
      <div className={styles.linkNavListWrapper}>
        <Link to="/" className={styles['nav-list']}>
          {translate('navigationWelcomeLink')}
        </Link>
        {isAuth && (
          <Link to="/GraphiQL" className={styles['nav-list']}>
            GraphiQL
          </Link>
        )}
      </div>

      {!isAuth ? (
        <div className={styles.buttonWrapper}>
          <Link to={`/account?auth=sign-in`} className={styles.linkButton}>
            <Button text={buttonSignIn} />
          </Link>
          <Link to={`/account?auth=sign-up`} className={styles.linkButton}>
            <Button text={buttonSignUp} />
          </Link>
        </div>
      ) : (
        <div>
          <Button text={buttonSignOut} clickHandler={handleSignOut} />
        </div>
      )}
    </nav>
  );
}
