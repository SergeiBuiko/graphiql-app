import { ThemeProvider, createTheme } from '@mui/material';
import { pink, purple } from '@mui/material/colors';
import { Suspense, lazy, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { Footer, Navigation } from './components';
import { Loading } from './components/Loading';
import { auth } from './firebaseClient/clientApp';
import { I18nProvider, LOCALES } from './i18n';
import { useAppDispatch, useAppSelector } from './store/hooks';
import { setUserEmail } from './store/slices/AuthenticationSlice';

const WelcomePage = lazy(() =>
  import('./pages/WelcomePage/WelcomePage').then(({ WelcomePage }) => ({
    default: WelcomePage,
  }))
);
const AccountPage = lazy(() =>
  import('./pages/AccountPage/AccountPage').then(({ AccountPage }) => ({
    default: AccountPage,
  }))
);
const GraphiQlPage = lazy(() =>
  import('./pages/GraphiQlPage/GraphiQlPage').then(({ GraphiQlPage }) => ({
    default: GraphiQlPage,
  }))
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage/NotFoundPage').then(({ NotFoundPage }) => ({
    default: NotFoundPage,
  }))
);
interface PrivateRouteProps {
  element: JSX.Element;
}

const darkTheme = createTheme({
  palette: {
    primary: purple,
    secondary: pink,
  },
});

export function App() {
  const [locale, setLocale] = useState(LOCALES.ENGLISH);
  const dispatch = useAppDispatch();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const isAuth = useAppSelector((state) => state.authentication.userEmail);

  useEffect(() => {
    const storedLocale = localStorage.getItem('locale');
    if (storedLocale) {
      setLocale(storedLocale);
    }
  }, []);

  const PrivateRoute = ({ element }: PrivateRouteProps) => {
    return isLoggedIn || isAuth ? (
      <>{element}</>
    ) : (
      <Navigate to="/" replace={true} />
    );
  };

  auth.onAuthStateChanged((user) => {
    if (user) {
      dispatch(setUserEmail({ userEmail: user.email }));
      localStorage.setItem('isLoggedIn', 'true');
    } else {
      dispatch(setUserEmail({ userEmail: null }));
      localStorage.removeItem('isLoggedIn');
    }
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <I18nProvider locale={locale}>
        <div className={styles['main-page__container']}>
          <Navigation locale={locale} updateLocale={setLocale} />

          <div className={styles.content}>
            <Routes>
              <Route
                path="/"
                element={
                  <Suspense fallback={<Loading />}>
                    <WelcomePage />
                  </Suspense>
                }
              />
              <Route
                path="/GraphiQL"
                element={
                  <Suspense fallback={<Loading />}>
                    <PrivateRoute element={<GraphiQlPage />} />
                  </Suspense>
                }
              />
              <Route
                path="/account"
                element={
                  <Suspense fallback={<Loading />}>
                    <AccountPage />
                  </Suspense>
                }
              />
              <Route
                path="/*"
                element={
                  <Suspense fallback={<Loading />}>
                    <NotFoundPage />
                  </Suspense>
                }
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </I18nProvider>
    </ThemeProvider>
  );
}
