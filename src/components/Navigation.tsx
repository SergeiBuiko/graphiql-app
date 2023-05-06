import { Link } from 'react-router-dom';
import '../assets/Logo.png';
import { useState } from 'react';

import styles from './navigation.module.css';

export function Navigation() {
  const [lang, setLang] = useState(true);
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
        <Link to="/account" className={styles['nav-list']}>
          LOG IN
        </Link>
      </div>
      <div>
        <button
          onClick={() => setLang((prev) => !prev)}
          className={styles['button-lang']}
        >
          {lang ? 'EN' : 'RU'}
        </button>
      </div>
    </nav>
  );
}
