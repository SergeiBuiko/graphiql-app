import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { AccountPage, GraphiQlPage } from './pages';
import { useState } from 'react';
import { I18nProvider, LOCALES } from './i18n';
import translate from './i18n/translate';
import { Footer, Navigation } from './components';

export function App() {
  const [locale, setLocal] = useState(LOCALES.ENGLISH);

  return (
    <I18nProvider locale={locale}>
      <div className={styles.lang}>
        {translate('hello')}
        <div className={styles.buttonWrapper}>
          <button
            className={styles.button}
            onClick={() => {
              setLocal(LOCALES.ENGLISH);
            }}
          >
            En
          </button>
          <button
            className={styles.button}
            onClick={() => {
              setLocal(LOCALES.RUSSIAN);
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
            <Route path="/" element={<WelcomePage />} />
            <Route path="/GraphiQL" element={<GraphiQlPage />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </I18nProvider>
  );
}
