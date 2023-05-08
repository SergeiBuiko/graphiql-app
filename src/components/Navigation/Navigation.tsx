import { Link } from 'react-router-dom';
import '../../assets/Logo.png';
import { useState } from 'react';
import ReactModal from 'react-modal';
import { signOut } from 'firebase/auth';

import styles from './Navigation.module.css';
import { Button } from '../common/Button';
import { SignIn } from '../common/LoginFormModal/SignIn';
import { SignUp } from '../common/LoginFormModal/SignUp';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { auth } from '../../firebaseClient/clientApp';
import { setUserEmail } from '../../store/slices/AuthenticationSlice';

export function Navigation() {
  const isAuth = useAppSelector((state) => state.authentication.userEmail);
  console.log(isAuth);
  const dispatch = useAppDispatch();

  const [modalFormIsOpen, setIsOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(false);

  const closeFormModal = () => setIsOpen(false);

  const openSignInModal = () => {
    setIsOpen(true);
    setIsSignIn(true);
  };

  const openSignUpModal = () => {
    setIsOpen(true);
    setIsSignIn(false);
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(setUserEmail({ userEmail: null }));
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

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
      </div>

      {!isAuth ? (
        <div className={styles.buttonWrapper}>
          <Link to="/account">
            <Button text={'Sigh In'} clickHandler={openSignInModal} />
          </Link>
          <Link to="/account">
            <Button text={'Sigh Up'} clickHandler={openSignUpModal} />
          </Link>
        </div>
      ) : (
        <div>
          <Button text={'Sigh Out'} clickHandler={handleSignOut} />
        </div>
      )}
      <ReactModal
        isOpen={modalFormIsOpen}
        onRequestClose={closeFormModal}
        ariaHideApp={false}
      >
        <div>
          <Button clickHandler={closeFormModal} text="Close" />
          {!isSignIn ? (
            <SignUp closeFormModal={closeFormModal} />
          ) : (
            <SignIn closeFormModal={closeFormModal} />
          )}
        </div>
      </ReactModal>
    </nav>
  );
}
