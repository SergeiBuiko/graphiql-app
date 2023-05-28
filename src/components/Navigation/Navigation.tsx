import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import '../../assets/Logo.png';
import { signOut } from 'firebase/auth';
import styles from './Navigation.module.css';
import { Button } from '../common/Button';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { auth } from '../../firebaseClient/clientApp';
import { setUserEmail } from '../../store/slices/AuthenticationSlice';
import translate from './../../i18n/translate';
import { useIntl } from 'react-intl';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button as MUIButton,
  Stack,
  ButtonGroup,
  useScrollTrigger,
  Grid,
  Hidden,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { LOCALES } from '../../i18n';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export function Navigation() {
  const isAuth = useAppSelector((state) => state.authentication.userEmail);
  const dispatch = useAppDispatch();
  const intl = useIntl();
  const navigate = useNavigate();
<<<<<<< HEAD
  const location = useLocation();
  const [locale, setLocal] = useState(LOCALES.ENGLISH);
  const trigger = useScrollTrigger();
=======
  const queryParams = location.pathname.includes('/GraphiQL');
>>>>>>> 597ee1bdbe640dc8b843dc372d5c6ccdc21268fb

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

  const defineNavStyle = useCallback(
    (path: string) => {
      console.log(location.pathname + location.search);
      return path === location.pathname + location.search
        ? 'contained'
        : 'outlined';
    },
    [location.pathname, location.search]
  );

  return (
    <>
      <nav className={styles.navigation}>
        <a href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md">
          <img className={styles['logo-main']} src="Logo.png"></img>
        </a>
        <div>
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
      <AppBar position="sticky" color={trigger ? 'secondary' : 'primary'}>
        <Grid
          container
          p={1}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid container xs={12} md={6} alignItems="center">
            <Hidden only="xs">
              <Grid item xs={false} md={1} mr={2}>
                <a href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md">
                  <img className={styles['logo-main']} src="Logo.png"></img>
                </a>
              </Grid>
            </Hidden>
            <Grid item>
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
            </Grid>
          </Grid>
          {/* <Stack direction="row" className={styles.navLinks} spacing={2}>
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
          </Stack> */}

          <Grid item display="flex">
            <Grid item display="flex" mr={2}>
              {!isAuth ? (
                <div className={styles.buttonWrapper}>
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
                    to={`/account?auth=sign-up`}
                    variant={defineNavStyle('/account?auth=sign-up')}
                    sx={{ color: 'white' }}
                  >
                    {translate('navigationBtnSighUp')}
                  </MUIButton>
                </div>
              ) : (
                <div>
                  <Button text={buttonSignOut} clickHandler={handleSignOut} />
                </div>
              )}
            </Grid>

            {/* <Stack marginLeft={'20px'}> */}
            <Grid item alignItems="center">
              <ButtonGroup size="small">
                <MUIButton
                  key="one"
                  variant={
                    locale === LOCALES.ENGLISH ? 'contained' : 'outlined'
                  }
                  onClick={() => {
                    setLocal(LOCALES.ENGLISH);
                  }}
                >
                  En
                </MUIButton>
                <MUIButton
                  key="two"
                  variant={
                    locale === LOCALES.RUSSIAN ? 'contained' : 'outlined'
                  }
                  onClick={() => {
                    setLocal(LOCALES.RUSSIAN);
                  }}
                >
                  Ru
                </MUIButton>
              </ButtonGroup>
            </Grid>
          </Grid>
          {/* </Stack> */}
          {/* <Stack spacing={2}>
            {!isAuth ? (
              <div className={styles.buttonWrapper}>
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
                  to={`/account?auth=sign-up`}
                  variant={defineNavStyle('/account?auth=sign-up')}
                  sx={{ color: 'white' }}
                >
                  {translate('navigationBtnSighUp')}
                </MUIButton>
              </div>
            ) : (
              <div>
                <Button text={buttonSignOut} clickHandler={handleSignOut} />
              </div>
            )}
          </Stack> */}

          {/* <Stack marginLeft={'20px'}>
            <ButtonGroup size="small">
              <MUIButton
                key="one"
                variant={locale === LOCALES.ENGLISH ? 'contained' : 'outlined'}
                onClick={() => {
                  setLocal(LOCALES.ENGLISH);
                }}
              >
                En
              </MUIButton>
              <MUIButton
                key="two"
                variant={locale === LOCALES.RUSSIAN ? 'contained' : 'outlined'}
                onClick={() => {
                  setLocal(LOCALES.RUSSIAN);
                }}
              >
                Ru
              </MUIButton>
            </ButtonGroup>
          </Stack> */}
        </Grid>
      </AppBar>
      {/* <nav className={styles.navigation}>
        <div>
          <Link to="/" className={styles['nav-list']}>
            {translate('navigationWelcomeLink')}
          </Link>
          <Link to="/GraphiQL" className={styles['nav-list']}>
            GraphiQL
          </Link>
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
      </nav> */}
    </>
  );
}
