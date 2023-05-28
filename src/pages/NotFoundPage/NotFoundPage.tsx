import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import styles from './NotFoundPage.module.css';
import translate from '../../i18n/translate';
import { useIntl } from 'react-intl';

export const NotFoundPage = () => {
  const navigate = useNavigate();
  const intl = useIntl();
  const textButton = intl.formatMessage({
    id: 'pageNotFoundButton',
  });

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.infoWrapper}>
        <h2 className={styles.title}>{translate('pageNotFound')}</h2>
        <p className={styles.info}>{translate('pageNotFoundInfo')}</p>
      </div>
      <Button text={textButton} clickHandler={() => navigate('/')} />
    </div>
  );
};
