import { Route, Routes, Navigate } from 'react-router-dom';
import styles from './App.module.css';
import { lazy, useState, Suspense, useEffect } from 'react';
import { I18nProvider, LOCALES } from './i18n';
import translate from './i18n/translate';
import { Footer, Navigation } from './components';
import { useAppDispatch, useAppSelector } from './store/hooks';
import * as React from 'react';
import { Loading } from './components/Loading';
import { auth } from './firebaseClient/clientApp';
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

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

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
    <I18nProvider locale={locale}>
      <div className={styles.lang}>
        {translate('hello')}
        <div className={styles.buttonWrapper}>
          <button
            className={`${styles.button} ${
              locale === LOCALES.ENGLISH ? styles.active : ''
            }`}
            onClick={() => {
              setLocale(LOCALES.ENGLISH);
            }}
          >
            En
          </button>
          <button
            className={`${styles.button} ${
              locale === LOCALES.RUSSIAN ? styles.active : ''
            }`}
            onClick={() => {
              setLocale(LOCALES.RUSSIAN);
            }}
          >
            Ru
          </button>
        </div>
      </div>

      <div className={styles['main-page__container']}>
        <Navigation />

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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </I18nProvider>
  );
}
