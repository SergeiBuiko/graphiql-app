import { Link } from 'react-router-dom';
import '../assets/Logo.png';
import { useState } from 'react';

import './navigation.css';

export function Navigation() {
  const [lang, setLang] = useState(true);
  return (
    <nav className="navigation-container">
      <a href="https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/graphiql.md">
        <img className="logo-main" src="Logo.png"></img>
      </a>
      <div>
        <Link to="/" className="nav-list">
          WELCOME PAGE
        </Link>
        <Link to="/GraphiQL" className="nav-list">
          GraphiQL
        </Link>
        <Link to="/account" className="nav-list">
          LOG IN
        </Link>
      </div>
      <div>
        <button
          onClick={() => setLang((prev) => !prev)}
          className="button-lang"
        >
          {lang ? 'EN' : 'RU'}
        </button>
      </div>
    </nav>
  );
}
