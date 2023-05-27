import '../../assets/GitHubLogo.png';
import '../../assets/GitHubLogo1.png';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles['footer-wrap']}>
      <div className={styles['develop-wrapper']}>
        <a href="https://github.com/SergeiBuiko/graphiql-app">
          <img className={styles['github-img']} src="GitHubLogo1.png"></img>
        </a>
        <div className={styles['develop-links']}>
          <a
            className={styles['github-link']}
            href="https://github.com/SergeiBuiko"
          >
            sergeibuiko
          </a>
          <a className={styles['github-link']} href="https://github.com/kavume">
            kavume
          </a>
          <a
            className={styles['github-link']}
            href="https://github.com/xobby-tt"
          >
            xobby-tt
          </a>
        </div>
      </div>
      <div>
        <p className={styles.text}>2023</p>
      </div>
      <div className="rs-school">
        <a href="https://rs.school/js/">
          <img
            className={styles['rs-img']}
            src="https://rs.school/images/rs_school_js.svg"
            alt="RS-logo"
          ></img>
        </a>
      </div>
    </footer>
  );
}
