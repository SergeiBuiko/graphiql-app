import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { WelcomePage } from './pages/WelcomePage';
import { GraphiQLPage } from './pages/GraphiQLPage';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AccounPage } from './pages/AccounPage';
import { useState } from 'react';
import { I18nProvider, LOCALES } from './i18n';
import translate from './i18n/translate';

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

        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/GraphiQL" element={<GraphiQLPage />} />
          <Route path="/account" element={<AccounPage />} />
        </Routes>
        <Footer />
      </div>
    </I18nProvider>
  );
}
