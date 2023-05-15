import styles from './WelcomePage.module.css';
import { Button } from '../../components/common/Button';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import translate from './../../i18n/translate';
import { useIntl } from 'react-intl';

export function WelcomePage() {
  const isAuth = useAppSelector((state) => state.authentication.userEmail);
  const intl = useIntl();

  const buttonSignIn = intl.formatMessage({
    id: 'welcomePageBtnSighIn',
  });
  const buttonSignUp = intl.formatMessage({
    id: 'welcomePageBtnSighUp',
  });
  const buttonGoToEditor = intl.formatMessage({
    id: 'welcomePageBtnGoToEditor',
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.infoWrapper}>
          <h2 className={styles.title}>
            {!isAuth
              ? translate('welcomePageTitleNotIsAuth')
              : translate('welcomePageTitleIsAuth')}
          </h2>
          <p className={styles.subtitle}>{translate('welcomePageSubtitle')}</p>
        </div>

        {!isAuth ? (
          <div className={styles.buttonsWrapper}>
            <Link to={`/account?auth=sign-in`} className={styles.linkButton}>
              <Button text={buttonSignIn} />
            </Link>
            <Link to={`/account?auth=sign-up`} className={styles.linkButton}>
              <Button text={buttonSignUp} />
            </Link>
          </div>
        ) : (
          <Link to={`/GraphiQL`} className={styles.linkButton}>
            <Button text={buttonGoToEditor} />
          </Link>
        )}
      </div>
    </div>
  );
}
