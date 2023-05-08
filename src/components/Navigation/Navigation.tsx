import { Link } from 'react-router-dom';
import '../../assets/Logo.png';
import { signOut } from 'firebase/auth';
import styles from './Navigation.module.css';
import { Button } from '../common/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { auth } from '../../firebaseClient/clientApp';
import { setUserEmail } from '../../store/slices/AuthenticationSlice';

export function Navigation() {
  const isAuth = useAppSelector((state) => state.authentication.userEmail);
  const dispatch = useAppDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUserEmail({ userEmail: null }));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <nav className={styles.navigation}>
      <a href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md">
        <img className={styles['logo-main']} src="Logo.png"></img>
      </a>
      <div>
        <Link to="/" className={styles['nav-list']}>
          WELCOME PAGE
        </Link>
        <Link to="/GraphiQL" className={styles['nav-list']}>
          GraphiQL
        </Link>
      </div>

      {!isAuth ? (
        <div className={styles.buttonWrapper}>
          <Link to={`/account?auth=sign-in`}>
            <Button text={'Sigh In'} />
          </Link>
          <Link to={`/account?auth=sign-up`}>
            <Button text={'Sigh Up'} />
          </Link>
        </div>
      ) : (
        <div>
          <Button text={'Sigh Out'} clickHandler={handleSignOut} />
        </div>
      )}
    </nav>
  );
}
