import '../assets/GitHubLogo.png';
import '../assets/GitHubLogo1.png';
import './footer.css';

export function Footer() {
  return (
    <footer className="footer-wrap">
      <div className="develop-wrapper">
        <a href="https://github.com/novedice/Brain-Workout">
          <img className="github-img" src="GitHubLogo1.png"></img>
        </a>
        <div className="develop-links">
          <a className="github-link" href="https://github.com/SergeiBuiko">
            sergeibuiko
          </a>
          <a className="github-link" href="https://github.com/kavume">
            kavume
          </a>
          <a className="github-link" href="https://github.com/xobby-tt">
            xobby-tt
          </a>
        </div>
      </div>
      <div className="year-main">
        <p className="text-header">2023</p>
      </div>
      <div className="rs-school">
        <a href="https://rs.school/js/">
          <img
            className="rs-img"
            src="https://rs.school/images/rs_school_js.svg"
            alt="RS-logo"
          ></img>
        </a>
      </div>
    </footer>
  );
}
