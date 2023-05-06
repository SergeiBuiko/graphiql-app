import { Route, Routes } from 'react-router-dom';
import './App.css';
import { WelcomePage } from './pages/WelcomePage';
import { GraphiQLPage } from './pages/GraphiQLPage';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { AccounPage } from './pages/AccounPage';

export function App() {
  return (
    <div className="main-page__container">
      <Navigation />

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/GraphiQL" element={<GraphiQLPage />} />
        <Route path="/account" element={<AccounPage />} />
      </Routes>
      <Footer />
    </div>
  );
}
