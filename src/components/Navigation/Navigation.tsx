import {
  AppBar,
  ButtonGroup,
  Button as MUIButton,
  useScrollTrigger,
} from '@mui/material';
import { signOut } from 'firebase/auth';
import { useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../../assets/Logo.png';
import { auth } from '../../firebaseClient/clientApp';
import { LOCALES } from '../../i18n';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setUserEmail } from '../../store/slices/AuthenticationSlice';
import translate from './../../i18n/translate';
import styles from './Navigation.module.css';

interface NavigationProps {
  locale: string;
  updateLocale: (locale: string) => void;
}
export function Navigation({ locale, updateLocale }: NavigationProps) {
  const isAuth = useAppSelector((state) => state.authentication.userEmail);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isScrolled = useScrollTrigger();

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

  const defineNavStyle = useCallback(
    (path: string) => {
      return path === location.pathname + location.search
        ? 'contained'
        : 'outlined';
    },
    [location.pathname, location.search]
  );

  return (
    <AppBar
      position="sticky"
      className={styles.appBar + ' ' + (isScrolled ? styles._scrolled : '')}
    >
      <div className={styles.headerContainer}>
        <a
          className={styles.logo}
          href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md"
        >
          <img className={styles['logo-main']} src="Logo.png"></img>
        </a>
        <nav className={styles.nav}>
          <MUIButton
            component={Link}
            to="/"
            sx={{ color: 'white' }}
            variant={defineNavStyle('/')}
          >
            {translate('navigationWelcomeLink')}
          </MUIButton>
          <MUIButton
            component={Link}
            to="/GraphiQL"
            variant={defineNavStyle('/GraphiQL')}
            sx={{ color: 'white' }}
          >
            GraphiQL
          </MUIButton>
        </nav>

        <nav className={styles.rightNav}>
          <>
            {!isAuth ? (
              <>
                <MUIButton
                  component={Link}
                  size="small"
                  to={`/account?auth=sign-in`}
                  color="secondary"
                  variant={defineNavStyle('/account?auth=sign-in')}
                  sx={{ color: 'white' }}
                >
                  {translate('navigationBtnSighIn')}
                </MUIButton>
                <MUIButton
                  component={Link}
                  color="secondary"
                  size="small"
                  to={`/account?auth=sign-up`}
                  variant={defineNavStyle('/account?auth=sign-up')}
                  sx={{ color: 'white' }}
                >
                  {translate('navigationBtnSighUp')}
                </MUIButton>
              </>
            ) : (
              <MUIButton
                color="secondary"
                size="small"
                variant="outlined"
                sx={{ color: 'white' }}
                onClick={handleSignOut}
              >
                {translate('navigationBtnSignOut')}
              </MUIButton>
            )}
          </>

          <div className={styles.translate}>
            <ButtonGroup size="small">
              <MUIButton
                key="one"
                size="small"
                variant={locale === LOCALES.ENGLISH ? 'contained' : 'outlined'}
                onClick={() => {
                  updateLocale(LOCALES.ENGLISH);
                }}
              >
                En
              </MUIButton>
              <MUIButton
                key="two"
                size="small"
                variant={locale === LOCALES.RUSSIAN ? 'contained' : 'outlined'}
                onClick={() => {
                  updateLocale(LOCALES.RUSSIAN);
                }}
              >
                Ru
              </MUIButton>
            </ButtonGroup>
          </div>
        </nav>
      </div>
    </AppBar>
  );
}
