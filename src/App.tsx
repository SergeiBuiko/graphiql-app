import { Route, Routes } from 'react-router-dom';
import styles from './App.module.css';
import { WelcomePage } from './pages/WelcomePage/WelcomePage';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AccountPage, GraphiQlPage } from './pages';

export function App() {
  return (
    <div className={styles['main-page__container']}>
      <Navigation />

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/GraphiQL" element={<GraphiQlPage />} />
        <Route path="/account" element={<AccountPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
