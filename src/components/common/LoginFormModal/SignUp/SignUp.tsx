import styles from './SignUp.module.css';
import { Input } from '../../Input';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../../firebaseClient/clientApp';
import { useAppDispatch } from '../../../../store/hooks';
import { setUserEmail } from '../../../../store/slices/AuthenticationSlice';
import { useForm } from 'react-hook-form';
import { Button } from '../../Button';
import { useNavigate } from 'react-router-dom';
import { useIntl } from 'react-intl';

interface FormData {
  email: string;
  password: string;
}

export const SignUp = () => {
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

  const emailExistError = intl.formatMessage({
    id: 'signUpEmailExistError',
  });
  const enterEmailPlaceholder = intl.formatMessage({
    id: 'signUpEnterEmailPlaceholder',
  });
  const enterPasswordPlaceholder = intl.formatMessage({
    id: 'signUpEnterPasswordPlaceholder',
  });
  const buttonSignUp = intl.formatMessage({
    id: 'signUpBtnSighUp',
  });
  const errRequired = intl.formatMessage({
    id: 'errRequired',
  });
  const errMinLength = intl.formatMessage({
    id: 'errMinLength',
  });
  const errAtLeastOneLetter = intl.formatMessage({
    id: 'errAtLeastOneLetter',
  });
  const errAtLeastOneDigit = intl.formatMessage({
    id: 'errAtLeastOneDigit',
  });
  const errSpecialCharacter = intl.formatMessage({
    id: 'errSpecialCharacter',
  });

  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const userEmailHandler = (userEmail: string | null) =>
    dispatch(setUserEmail({ userEmail }));

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        userEmailHandler(userCredential.user.email);
        reset();
        navigate('/GraphiQL');
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          setErrorMessage(emailExistError);
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
          validate: {
            atLeastOneLetter: (value) =>
              /[a-zA-Z]/.test(value) || errAtLeastOneLetter,

            atLeastOneDigit: (value) => /\d/.test(value) || errAtLeastOneDigit,
            specialCharacter: (value) =>
              /[!@#$%^&*(),.?":{}|<>]/.test(value) || errSpecialCharacter,
          },
        })}
        error={errors?.password?.message}
      />
      <Button clickHandler={handleSubmit(handleSignUp)} text={buttonSignUp} />
      {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
    </div>
  );
};
