import '../assets/GitHubLogo.png';
import '../assets/GitHubLogo1.png';
import style from './footer.module.css';

export function Footer() {
  return (
    <footer className={style['footer-wrap']}>
      <div className={style['develop-wrapper']}>
        <a href="https://github.com/SergeiBuiko/graphiql-app">
          <img className={style['github-img']} src="GitHubLogo1.png"></img>
        </a>
        <div className={style['develop-links']}>
          <a
            className={style['github-link']}
            href="https://github.com/SergeiBuiko"
          >
            sergeibuiko
          </a>
          <a className={style['github-link']} href="https://github.com/kavume">
            kavume
          </a>
          <a
            className={style['github-link']}
            href="https://github.com/xobby-tt"
          >
            xobby-tt
          </a>
        </div>
      </div>
      <div>
        <p>2023</p>
      </div>
      <div className="rs-school">
        <a href="https://rs.school/js/">
          <img
            className={style['rs-img']}
            src="https://rs.school/images/rs_school_js.svg"
            alt="RS-logo"
          ></img>
        </a>
      </div>
    </footer>
  );
}
