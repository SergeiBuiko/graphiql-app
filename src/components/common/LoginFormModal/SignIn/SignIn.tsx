import styles from './SignIn.module.css';
import { Input } from '../../Input';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '../../Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseClient/clientApp';
import { useAppDispatch } from '../../../../store/hooks';
import { setUserEmail } from '../../../../store/slices/AuthenticationSlice';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

interface FormData {
  email: string;
  password: string;
}

export const SignIn = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const intl = useIntl();

  const errorWrongPassword = intl.formatMessage({
    id: 'signInWrongPassword',
  });
  const errorUserNotFound = intl.formatMessage({
    id: 'signInUserNotFound',
  });
  const enterEmailPlaceholder = intl.formatMessage({
    id: 'signInEnterEmailPlaceholder',
  });
  const enterPasswordPlaceholder = intl.formatMessage({
    id: 'signInEnterPasswordPlaceholder',
  });
  const buttonSignIn = intl.formatMessage({
    id: 'signUpBtnSighIn',
  });
  const errRequired = intl.formatMessage({
    id: 'errRequired',
  });
  const errMinLength = intl.formatMessage({
    id: 'errMinLength',
  });

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const userEmailHandler = (userEmail: string | null) =>
    dispatch(setUserEmail({ userEmail }));

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userEmailHandler(userCredential.user.email);
        reset();
        navigate('/GraphiQL');
      })
      .catch((error) => {
        if (error.code === 'auth/wrong-password') {
          setErrorMessage(errorWrongPassword);
        } else if (error.code === 'auth/user-not-found') {
          setErrorMessage(errorUserNotFound);
        } else {
          console.log(error.message);
        }
      });
  };

  return (
    <div className={styles.contentWrapper}>
      <Input
        type="email"
        placeholder={enterEmailPlaceholder}
        onInput={handleChangeEmail}
        {...register('email', {
          required: {
            value: true,
            message: errRequired,
          },
        })}
        error={errors?.email?.message}
      />
      <Input
        type="text"
        placeholder={enterPasswordPlaceholder}
        onInput={handleChangePassword}
        {...register('password', {
          required: {
            value: true,
            message: errRequired,
          },
          minLength: {
            value: 8,
            message: errMinLength,
          },
        })}
        error={errors?.password?.message}
      />
      <Button clickHandler={handleSubmit(handleSignIn)} text={buttonSignIn} />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
